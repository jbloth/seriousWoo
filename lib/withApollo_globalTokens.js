import withApollo from 'next-with-apollo';
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable, from } from 'apollo-link';
import { getDataFromTree } from '@apollo/react-ssr';
import Cookies from 'js-cookie';
import cookies from 'next-cookies';
import { v4 as uuid } from 'uuid';

// stores token-cookie names
import clientConfig from '../clientConfig';
import { isTokenExpiredOrInvalid } from './auth';
import auth from './auth';

// needed for getting the price from different product types in Woocommerce Graphql
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// Refresh auth token on authorization error. Needs more work.
// Inspired by https://stackoverflow.com/questions/50965347/how-to-execute-an-async-fetch-request-and-then-retry-last-failed-request
const refreshOnErrorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (
    graphQLErrors &&
    graphQLErrors[0].message &&
    (graphQLErrors[0].message === 'Internal server error' ||
      graphQLErrors[0].message === 'Not authorized to access this customer')
  ) {
    const authToken = auth.getAuthToken();
    const refreshToken = auth.getRefreshToken();
    if (refreshToken && authToken) {
      return new Observable((observer) => {
        fetch(clientConfig.graphqlUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, // TODO: credentials not allowed?
          //   headers: { 'Content-Type': 'application/json', credentials: 'include' },
          body: JSON.stringify({
            query: `
                mutation refreshJwtAuthToken {
                  refreshJwtAuthToken(input: {
                      clientMutationId: "${uuid()}",
                      jwtRefreshToken: "${refreshToken}"
                  }) {
                      authToken
                  }
                }
              `,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            const newToken = response?.data?.refreshJwtAuthToken?.authToken
              ? response.data.refreshJwtAuthToken.authToken
              : null; // ????

            if (newToken) {
              auth.setAuthToken(newToken);

              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: `Bearer ${newToken}` || null,
                },
              }));
            } else {
              reject(new Error('Could not refresh auth token.'));
            }
          })
          .then(() => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            };

            // Retry last failed request
            forward(operation).subscribe(subscriber);
          })
          .catch((error) => {
            // No refresh or client token available, we force user to login
            auth.logoutUser();
            observer.error(error);
          });
      });
    }
  }
});

/* Middleware that adds a Woocommerce sesssion token to query if there is one
 * in localStorage. Code taken from
 * https://github.com/wp-graphql/wp-graphql-woocommerce/pull/88
 */
export const sendSessionTokenLink = new ApolloLink((operation, forward) => {
  /**
   * If session data exist in local storage, set value as session header.
   */
  // const session = process.browser ? localStorage.getItem('woo-session') : null;
  const session = process.browser ? Cookies.get('woo-session') : null;

  if (session) {
    // Check if session is expired
    const expired = isTokenExpiredOrInvalid(session);

    if (!expired) {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          'woocommerce-session': `Session ${session}`,
        },
      }));
    } else {
      // localStorage.removeItem('woo-session');
      Cookies.remove('woo-session');
    }
  }

  return forward(operation);
});

/* Middleware that extracts a Woocommerce sesssion token from the response.
 * Code taken from https://github.com/wp-graphql/wp-graphql-woocommerce/pull/88
 */

export const receiveSessionTokenLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    /**
     * Check for session header and update session in local storage accordingly.
     */
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    const session = headers.get('woocommerce-session');

    if (session) {
      // Copied this part (if "false"...) from code-sandbox
      // (https://codesandbox.io/s/crazy-hugle-sm1eb?file=/src/index.js:1541-1825),
      // because I am having trouble with expired sessions. Hope it helps.
      if ('false' === session) {
        // remove session data if session destroyed.
        // localStorage.removeItem('woo-session');
        Cookies.remove('woo-session');
        // } else if (localStorage.getItem('woo-session') !== session) {
      } else if (Cookies.get('woo-session') !== session) {
        // let consentCookie = Cookies.get('consent');
        // consentCookie =
        //   consentCookie && consentCookie.length ? JSON.parse(consentCookie) : undefined;
        // if (consentCookie && consentCookie.agreed) {
        // console.log('setting session token');
        // update session new data if changed.
        // localStorage.setItem('woo-session', headers.get('woocommerce-session'));
        Cookies.set('woo-session', headers.get('woocommerce-session'), {
          expires: 2,
        });
        // }
      }
    }

    return response;
  });
});

/* Adds auth token to request */
const authMiddleware = new ApolloLink((operation, forward) => {
  let token = Cookies.get(clientConfig.authTokenName);

  const refreshToken = Cookies.get(clientConfig.refreshTokenName);

  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

// /* Pulls refresh token from response an saves it to cookie */
// const authAfterware = new ApolloLink((operation, forward) =>
//   forward(operation).map((response) => {
//     const ctx = operation.getContext();
//     const res = ctx.response;

//     try {
//       // Do we have a response?
//       if (res) {
//         const { headers } = res;
//         // Do we have headers with refresh token
//         if (!!headers.get('X-JWT-Refresh')) {
//           // get refresh token.
//           const refreshToken = headers.get('X-JWT-Refresh');
//           const authToken = headers.get('X-JWT-Auth');

//           if (!!refreshToken) {
//             auth.setRefreshToken(refreshToken);
//             // Cookies.set(clientConfig.refreshTokenName, refreshToken, { expires: clientConfig.tokenExpiry });
//           }

//           if (!!authToken) {
//             auth.setAuthToken(authToken);
//             // Cookies.set(clientConfig.refreshTokenName, authToken, { expires: clientConfig.tokenExpiry });
//             // globalAuthToken = authToken;
//           }
//         }
//       }
//     } catch (e) {
//       console.log(e);
//     }

//     return response;
//   })
// );

function createClient({ headers, initialState, ctx }) {
  // get the authentication token from cookie
  // TODO rename vars, global is misleading
  let cookieAuthToken = null;
  let cookieRefreshToken = null;
  let cookieUserId = null;
  if (!ctx) {
    cookieAuthToken = Cookies.get(clientConfig.authTokenName);
    cookieRefreshToken = Cookies.get(clientConfig.refreshTokenName);
    cookieUserId = Cookies.get(clientConfig.userIdName);
  } else {
    ({
      [clientConfig.authTokenName]: cookieAuthToken,
      [clientConfig.refreshTokenName]: cookieRefreshToken,
      [clientConfig.userIdName]: cookieUserId,
    } = cookies(ctx));
  }

  if (cookieAuthToken) {
    auth.setAuthToken(cookieAuthToken);
  }

  if (cookieRefreshToken) {
    auth.setRefreshToken(cookieRefreshToken);
  }

  if (cookieUserId) {
    auth.setUserId(cookieUserId);
  }

  // Add auth token to headers
  const authLink = setContext((request, previousContext) => {
    let headers = previousContext.headers;
    const token = auth.getAuthToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const cache = new InMemoryCache({ fragmentMatcher }).restore(initialState || {});

  const httpLink = createHttpLink({
    uri: clientConfig.graphqlUrl,
    credentials: 'same-origin', // "Include" throws error (?)
    fetch,
  });

  return new ApolloClient({
    link: from([
      sendSessionTokenLink,
      receiveSessionTokenLink,
      authLink,
      refreshOnErrorLink,
      // authAfterware,
      httpLink,
    ]),
    cache,
  });
}

export default withApollo(createClient, { getDataFromTree });

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

// needed for getting the price from different product types in Woocommerce Graphql
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const refreshOnErrorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (!process.browser) {
  }
  console.log('----- Im the Link -------');
  let token = Cookies.get(clientConfig.authTokenName);
  const refreshToken = Cookies.get(clientConfig.refreshTokenName);

  console.log(token);

  if (
    graphQLErrors &&
    graphQLErrors[0].message &&
    graphQLErrors[0].message === 'Not authorized to access this customer'
  ) {
    console.log('----- onerror triggered ------');
    console.log('tokens: ');
    console.log(token);
    console.log(refreshToken);
    if (refreshToken && token) {
      console.log('----- refreshToken && token sind da ------');
      return new Observable((observer) => {
        fetch(clientConfig.graphqlUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', credentials: 'same-origin' },
          body: JSON.stringify({
            query: `
                mutation refreshJwtAuthToken {
                  refreshJwtAuthToken(input: {
                      clientMutationId: "${uuid()}",
                      jwtRefreshToken: "${currentRefreshToken}"
                  }) {
                      authToken
                  }
                }
              `,
          }),
        })
          .then((response) => {
            console.log('----- response ------');
            console.log(response);
            return response.json();
          })
          .then((response) => {
            console.log('-----------');
            console.log(response);
            // operation.setContext(({ headers = {} }) => ({
            //   headers: {
            //     ...headers,
            //     authorization: `Bearer ${response.access_token}` || null,
            //   }
            // }));
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
            observer.error(error);
          });
      });
    }
  }
  // return forward(operation);
});

/* Middleware that adds a Woocommerce sesssion token to query if there is one
 * in localStorage. Code taken from
 * https://github.com/wp-graphql/wp-graphql-woocommerce/pull/88
 */
export const sendSessionTokenLink = new ApolloLink((operation, forward) => {
  /**
   * If session data exist in local storage, set value as session header.
   */
  const session = process.browser ? localStorage.getItem('woo-session') : null;
  if (session) {
    // Check if session is expired
    let expTime = localStorage.getItem('woo-session-expTime');
    if (!expTime) {
      expTime = 0;
    }
    const expired = expTime && parseInt(expTime) - Date.now() < 0;
    console.log('expired ' + expired);
    console.log('exptime ');
    const exp = new Date(parseInt(expTime));
    console.log(exp.toString());
    const timeuntil = parseInt(expTime) - Date.now();
    console.log('time until expiration ' + timeuntil);

    if (!expired) {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          'woocommerce-session': `Session ${session}`,
        },
      }));
    } else {
      localStorage.removeItem('woo-session');
      localStorage.removeItem('seriousCart');
      localStorage.removeItem('woo-session-expTime');
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
      console.log('in receiveSessionTokenLink');
      console.log(session);

      if (localStorage.getItem('woo-session') !== session) {
        localStorage.setItem('woo-session', headers.get('woocommerce-session'));
        //------ //
        const expireTime = Date.now() + 47 * 3600 * 1000;
        localStorage.setItem('woo-session-expTime', expireTime.toString());
        //------ //
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

/* Pulls refresh token from response an saves it to cookie */
const authAfterware = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const ctx = operation.getContext();
    const res = ctx.response;
    console.log('-------- afterware --------');

    try {
      // Do we have a response?
      if (res) {
        const { headers } = res;
        console.log(headers.get('woocommerce-session'));
        // Do we have headers with refresh token
        if (!!headers.get('X-JWT-Refresh')) {
          // get refresh token.
          const refreshToken = headers.get('X-JWT-Refresh');
          const authToken = headers.get('X-JWT-Auth');

          console.log('refreshToken ' + refreshToken);
          console.log('authToken ' + authToken);

          console.log('-------- ------ --------');

          if (!!refreshToken) {
            console.log('setting refresh token in afterware');
            Cookies.set(clientConfig.refreshTokenName, refreshToken);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }

    return response;
  })
);

function createClient({ headers, initialState, ctx }) {
  // Add auth token to headers
  const authLink = setContext((request, previousContext) => {
    let token = null;
    let refreshToken = null;

    // get the authentication token from cookie
    if (!ctx) {
      token = Cookies.get(clientConfig.authTokenName);
      refreshToken = Cookies.get(clientConfig.refreshTokenName);
    } else {
      ({
        [clientConfig.authTokenName]: token,
        [clientConfig.refreshTokenName]: refreshToken,
      } = cookies(ctx));
    }

    let headers = previousContext.headers;

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
    credentials: 'include',
    fetch,
  });

  return new ApolloClient({
    link: from([sendSessionTokenLink, receiveSessionTokenLink, authLink, httpLink]),
    cache,
  });
}

export default withApollo(createClient, { getDataFromTree });

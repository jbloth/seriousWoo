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

// stores token-cookie names
import clientConfig from '../clientConfig';

// needed for getting the price from different product types in Woocommerce Graphql
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
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
  // const alsotoken = localStorage.getItem(clientConfig.authTokenName);
  // if (token && refreshToken) {
  //   token = await fetchNewAccessToken(refreshToken, token);
  //   // Seems to work on inital page render. Not sure why.
  //   Cookies.set(clientConfig.authTokenName, token);
  // }

  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      // authorization: token || null,
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

    try {
      // Do we have a response?
      if (res) {
        const { headers } = res;

        // Do we have headers with refresh token
        if (!!headers.get('X-JWT-Refresh')) {
          // get refresh token.
          const refreshToken = headers.get('X-JWT-Refresh');

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
    if (process.browser) {
      token = Cookies.get(clientConfig.authTokenName);
      refreshToken = Cookies.get(clientConfig.refreshTokenName);
    } else {
      ({
        [clientConfig.authTokenName]: token,
        [clientConfig.refreshTokenName]: refreshToken,
      } = cookies(ctx));
    }

    let headers = previousContext.headers;

    // return the headers to the context so httpLink can read them
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

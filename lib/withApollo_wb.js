import withApollo from 'next-with-apollo';
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink, from } from 'apollo-link';
import { getDataFromTree } from '@apollo/react-ssr';
import Cookies from 'js-cookie';

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
    if (!expired) {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          'woocommerce-session': `Session ${session}`,
        },
      }));
    }
    // else {
    //   localStorage.removeItem('woo-session');
    //   localStorage.removeItem('seriousCart');
    //   localStorage.removeItem('woo-session-expTime');
    // }
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
      if (localStorage.getItem('woo-session') !== session) {
        localStorage.setItem('woo-session', headers.get('woocommerce-session'));
        //------ //
        const expireTime = Date.now() + 48 * 3600 * 1000;
        localStorage.setItem('woo-session-expTime', expireTime.toString());
        //------ //
      }
    }

    return response;
  });
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookies.get(clientConfig.authTokenName);

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

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get(clientConfig.authTokenName);
  console.log('old');
  console.log(headers);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

function createClient({ headers, initialState }) {
  const cache = new InMemoryCache({ fragmentMatcher }).restore(initialState || {});
  const httpLink = createHttpLink({
    uri: clientConfig.graphqlUrl,
    fetch: fetch,
  });

  return new ApolloClient({
    // link: sendSessionTokenLink.concat(
    //   receiveSessionTokenLink.concat(
    //     authLink.concat(
    //       createHttpLink({
    //         uri: clientConfig.graphqlUrl,
    //         fetch: fetch,
    //       })
    //     )
    //   )
    // ),
    link: from([sendSessionTokenLink, receiveSessionTokenLink, authMiddleware, httpLink]),
    cache,
  });
}

export default withApollo(createClient, { getDataFromTree });

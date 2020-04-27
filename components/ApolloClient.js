import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

import clientConfig from '../clientConfig';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

/* Middleware that adds a Woocommerce sesssion token to query if there is one
 * in localStorage. Code taken from
 * https://github.com/wp-graphql/wp-graphql-woocommerce/pull/88
 */

export const sendSessionTokenLink = new ApolloLink((operation, forward) => {
  console.log('middleware');
  /**
   * If session data exist in local storage, set value as session header.
   */
  const session = process.browser ? localStorage.getItem('woo-session') : null;

  if (session) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        'woocommerce-session': `Session ${session}`,
      },
    }));
  }

  return forward(operation);
});

/* Middleware that extracts a Woocommerce sesssion token from the response.
 * Code taken from https://github.com/wp-graphql/wp-graphql-woocommerce/pull/88
 */

export const receiveSessionTokenLink = new ApolloLink((operation, forward) => {
  console.log('afterware');
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
      }
    }

    return response;
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache({ fragmentMatcher }),
  link: sendSessionTokenLink.concat(
    receiveSessionTokenLink.concat(
      createHttpLink({
        uri: clientConfig.graphqlUrl,
        fetch: fetch,
      })
    )
  ),
  resolvers: {},
});

export default client;

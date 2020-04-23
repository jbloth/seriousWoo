import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';
import clientConfig from '../clientConfig';

import { CART_QUERY } from './CartModal.js';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

const resolvers = {
  Mutation: {
    toggleCartOpen: (_root, args, { cache }) => {
      const { localCart } = cache.readQuery({ query: CART_QUERY });
      const newCart = { ...localCart, open: !localCart.open };
      cache.writeData({
        data: {
          localCart: newCart,
        },
      });
      return newCart;
    },
  },
};

const client = new ApolloClient({
  cache,
  link: createHttpLink({
    uri: clientConfig.graphqlUrl,
    fetch: fetch,
  }),
  resolvers: resolvers,
});

cache.writeData({
  data: {
    localCart: {
      __typename: 'LocalCart',
      open: false,
      numItems: 0,
    },
    selectedTag: null,
  },
});

export default client;

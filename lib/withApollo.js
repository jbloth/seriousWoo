import withApollo from 'next-with-apollo';
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';
import clientConfig from '../clientConfig';

import { CART_QUERY } from '../components/CartModal.js';
import Layout from '../components/Layout';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });
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

export default withApollo(
  ({ initialState }) => {
    // const cache = new InMemoryCache({ fragmentMatcher }).restore(initialState || {});
    return new ApolloClient({
      cache: cache.restore(initialState || {}),
      link: createHttpLink({
        uri: clientConfig.graphqlUrl,
        fetch: fetch,
      }),
      resolvers: resolvers,
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Layout>
            <Page {...props} />
          </Layout>
        </ApolloProvider>
      );
    },
  }
);

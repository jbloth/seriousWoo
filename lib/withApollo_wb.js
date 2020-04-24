import withApollo from 'next-with-apollo';
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { getDataFromTree } from '@apollo/react-ssr';

// needed for getting the price from different product types in Woocommerce Graphql
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';
import clientConfig from '../clientConfig';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: createHttpLink({
      uri: clientConfig.graphqlUrl,
      fetch: fetch,
    }),
    cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });

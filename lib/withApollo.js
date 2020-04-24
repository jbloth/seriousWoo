import withApollo from 'next-with-apollo';
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

// needed for getting the price from different product types in Woocommerce Graphql
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';
import clientConfig from '../clientConfig';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

// const cache = new InMemoryCache({ fragmentMatcher });

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {}),
      link: createHttpLink({
        uri: clientConfig.graphqlUrl,
        fetch: fetch,
      }),
      // resolvers: resolvers,
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);

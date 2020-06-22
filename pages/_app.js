import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { useApollo } from '../lib/withApollo_globalTokens';

import { AppProvider } from '../components/context/AppContext'; // state (using context)
import { CookieConsentProvider } from '../components/context/CookieConsentContext'; // cookie consent state

import Layout from '../components/Layout'; // Header and Footer

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        <CookieConsentProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CookieConsentProvider>
      </AppProvider>
    </ApolloProvider>
  );
}

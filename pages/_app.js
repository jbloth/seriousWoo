import React from 'react';
import App from 'next/app';

import withApollo from '../lib/withApollo_globalTokens';
import { AppProvider } from '../components/context/AppContext'; // state (using context)
import { CookieConsentProvider } from '../components/context/CookieConsentContext'; // cookie consent state

import Layout from '../components/Layout'; // Header and Footer

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppProvider>
        <CookieConsentProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CookieConsentProvider>
      </AppProvider>
    );
  }
}

export default withApollo(MyApp, {
  ssr: false,
});

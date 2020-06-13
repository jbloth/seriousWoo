import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import { AppProvider } from '../components/context/AppContext'; // state (using context)
import { CookieConsentProvider } from '../components/context/CookieConsentContext'; // cookie consent state

import Layout from '../components/Layout'; // Header and Footer
// import withApollo from '../lib/withApollo_wb'; // Apollo HOC
import withApollo from '../lib/withApollo_globalTokens'; // Apollo HOC

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;

    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <AppProvider>
          <CookieConsentProvider>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </CookieConsentProvider>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);

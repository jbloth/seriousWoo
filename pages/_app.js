import React from 'react';
import App from 'next/app';
// import { ApolloProvider } from '@apollo/react-hooks';
// ---- test ----- //
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
// --------------- //

import { AppProvider } from '../components/context/AppContext'; // state (using context)
// import withApollo from '../lib/withApollo';
import withApollo from '../lib/withApollo_wb'; // Apollo HOC

import Layout from '../components/Layout'; // Header and Footer

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

    // TODO: remove ApolloHooksProvider
    return (
      <ApolloProvider client={apollo}>
        <ApolloHooksProvider client={apollo}>
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);

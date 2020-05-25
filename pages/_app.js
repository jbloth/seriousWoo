import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import cookies from 'next-cookies';

// stores token-cookie names
import clientConfig from '../clientConfig';
import { AppProvider } from '../components/context/AppContext'; // state (using context)
import Layout from '../components/Layout'; // Header and Footer
// import withApollo from '../lib/withApollo_wb'; // Apollo HOC
// import withApollo from '../lib/withApollo_withInit'; // Apollo HOC
import withApollo from '../lib/withApollo_globalTokens'; // Apollo HOC

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // Not yet sure what this does (copied from Wes Bos Advanced React course)
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;

    // Load auth token and pass it down to components (needed in header)
    const { [clientConfig.authTokenName]: token } = cookies(ctx);
    pageProps.authToken = token;

    return { pageProps };
  }

  // TODO: Delete UserProvider
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <AppProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);

import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import client from '../components/ApolloClient';
import Layout from '../components/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default MyApp;

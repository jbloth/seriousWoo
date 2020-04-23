import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import { AppProvider } from '../components/context/AppContext';
import client from '../components/ApolloClient';
import Layout from '../components/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={client}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default MyApp;

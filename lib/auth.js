import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-unfetch';
import { v4 as uuid } from 'uuid';
import Cookies from 'js-cookie';

import clientConfig from '../clientConfig';
import { isEmpty } from './functions';

export const isUserValidated = () => {
  const token = Cookies.get(clientConfig.authTokenName);
  // TODO: Refresh if necceessary
  return !isEmpty(token);
};

export const isTokenExpired = (token) => {
  const tokenData = jwtDecode(token);
  return tokenData.exp * 1000 < Date.now();
};

export const fetchNewAccessToken = async (currentRefreshToken, authToken) => {
  if (!authToken || !isTokenExpired(authToken)) {
    return authToken;
  }

  try {
    const fetchResult = await fetch(clientConfig.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', credentials: 'include' },
      body: JSON.stringify({
        query: `
        mutation refreshJwtAuthToken {
          refreshJwtAuthToken(input: {
              clientMutationId: "${uuid()}",
              jwtRefreshToken: "${currentRefreshToken}"
          }) {
              authToken
          }
        }
      `,
      }),
    });

    const refreshResponse = await fetchResult.json();

    console.log(
      `Refresh token response: ${
        refreshResponse.data && refreshResponse.data.refreshJwtAuthToken
          ? refreshResponse.data.refreshJwtAuthToken.authToken
          : ''
      }`
    );

    if (!refreshResponse?.data?.refreshJwtAuthToken?.authToken) {
      // return undefined;
      return null;
    }

    return refreshResponse.data.refreshJwtAuthToken.authToken;
  } catch (e) {
    console.error('Failed to fetch fresh access token', e);
  }
};

export const loginUser = (userData) => {
  // Save user id, auth token and refresh token to cookies to be able to access them
  // in the getInitialProps function of the myAccount component and in withApollo.
  // TODO: Find out how to use http only cookie or app storage for id and auth token.
  Cookies.set(clientConfig.userIdName, userData.id);
  Cookies.set(clientConfig.authTokenName, userData.jwtAuthToken);
  Cookies.set(clientConfig.refreshTokenName, userData.jwtRefreshToken);
};

export const logoutUser = () => {
  Cookies.remove(clientConfig.userIdName);
  Cookies.remove(clientConfig.authTokenName);
  Cookies.remove(clientConfig.refreshTokenName);
};

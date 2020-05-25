import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-unfetch';
import { v4 as uuid } from 'uuid';
import Cookies from 'js-cookie';

import clientConfig from '../clientConfig';
import { isEmpty } from './functions';
import { login, logout } from './withApollo_globalTokens';

// export const isUserValidated = () => {
//   const token = Cookies.get(clientConfig.authTokenName);
//   return !isEmpty(token);
// };

let memoryAuthToken = null;
let memoryRefreshToken = null;

export const isTokenExpired = (token) => {
  const tokenData = jwtDecode(token);
  return tokenData.exp * 1000 < Date.now();
};

export const fetchNewAccessToken = async (currentRefreshToken, authToken) => {
  if (!authToken || !isTokenExpired(authToken)) {
    return authToken;
  }

  try {
    console.log('Trying to refresh');
    const fetchResult = await fetch(clientConfig.graphqlUrl, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json', credentials: 'include' },
      headers: { 'Content-Type': 'application/json' },
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

    const newToken = refreshResponse.data.refreshJwtAuthToken.authToken;
    if (process.browser) {
      Cookies.set(clientConfig.authTokenName, newToken);
    }

    return refreshResponse.data.refreshJwtAuthToken.authToken;
  } catch (e) {
    console.error('Failed to fetch fresh access token', e);
  }
};

export const getAuthToken = () => {
  return memoryAuthToken;
};

export const setAuthToken = (token) => {
  memoryAuthToken = token;
  if (process.browser) {
    Cookies.set(clientConfig.authTokenName, token);
  }
};

export const getRefreshToken = () => {
  return memoryRefreshToken;
};

export const setRefreshToken = (refreshToken) => {
  memoryRefreshToken = refreshToken;
  if (process.browser) {
    Cookies.set(clientConfig.refreshTokenName, refreshToken);
  }
};

export const loginUser = (userData) => {
  // Save user id, auth token and refresh token to cookies to be able to access them
  // in the getInitialProps function of the myAccount component and in withApollo.
  // TODO: Find out how to use http only cookie or app storage for id and auth token.
  Cookies.set(clientConfig.userIdName, userData.id);
  Cookies.set(clientConfig.authTokenName, userData.jwtAuthToken);
  Cookies.set(clientConfig.refreshTokenName, userData.jwtRefreshToken);
  memoryAuthToken = userData.jwtAuthToken;
  memoryRefreshToken = userData.jwtRefreshToken;
};

export const logoutUser = () => {
  Cookies.remove(clientConfig.userIdName);
  Cookies.remove(clientConfig.authTokenName);
  Cookies.remove(clientConfig.refreshTokenName);
  memoryAuthToken = null;
  memoryRefreshToken = null;
};

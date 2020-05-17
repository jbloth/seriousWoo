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
  if (!!authToken || !isTokenExpired(authToken)) {
    return authToken;
  }
  // console.log(`Refresh token: ${currentRefreshToken}`)
  try {
    const fetchResult = await fetch(clientConfig.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', credentials: 'same-origin' },
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

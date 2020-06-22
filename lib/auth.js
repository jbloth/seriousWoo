import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { BehaviorSubject } from 'rxjs';

import clientConfig from '../clientConfig';

let auth = (function () {
  let memoryAuthToken = null;
  let memoryRefreshToken = null;
  let memoryUserId = null;

  if (process.browser) {
    memoryAuthToken = Cookies.get(clientConfig.authTokenName);
    memoryRefreshToken = Cookies.get(clientConfig.refreshTokenName);
    memoryUserId = Cookies.get(clientConfig.userIdName);
  }

  // observable-version of getAuthToken (Use a subject, so that we can trigger the
  // emission of the updated token when the user logs in or out.)
  const authTokenSubject = new BehaviorSubject(memoryAuthToken);

  return {
    // Use asObservable to prevent external functions from calling 'next' on the
    // Subject
    authTokenObservable: authTokenSubject.asObservable(),

    getAuthToken: () => {
      return memoryAuthToken;
    },

    setAuthToken: (token) => {
      memoryAuthToken = token;
      authTokenSubject.next(token);
      if (process.browser) {
        Cookies.set(clientConfig.authTokenName, token, { expires: clientConfig.tokenExpiry });

        // also set refresh token and user id so that they expire at the same time
        Cookies.set(clientConfig.refreshTokenName, memoryRefreshToken, {
          expires: clientConfig.tokenExpiry,
        });
        Cookies.set(clientConfig.userIdName, memoryUserId, { expires: clientConfig.tokenExpiry });
      }
    },

    getRefreshToken: () => {
      return memoryRefreshToken;
    },

    setRefreshToken: (refreshToken) => {
      memoryRefreshToken = refreshToken;
      if (process.browser) {
        Cookies.set(clientConfig.refreshTokenName, refreshToken, {
          expires: clientConfig.tokenExpiry,
        });

        // also set auth token and id so that they expire at the same time
        Cookies.set(clientConfig.authTokenName, memoryAuthToken, {
          expires: clientConfig.tokenExpiry,
        });
        Cookies.set(clientConfig.userIdName, memoryUserId, { expires: clientConfig.tokenExpiry });
      }
    },

    getUserId: () => {
      return memoryUserId;
    },

    setUserId: (id) => {
      memoryUserId = id;
      if (process.browser) {
        Cookies.set(clientConfig.userIdName, id, { expires: clientConfig.tokenExpiry });

        // also set refresh and auth token so that they expire at the same time
        Cookies.set(clientConfig.authTokenName, memoryAuthToken, {
          expires: clientConfig.tokenExpiry,
        });
        Cookies.set(clientConfig.refreshTokenName, memoryRefreshToken, {
          expires: clientConfig.tokenExpiry,
        });
      }
    },

    loginUser: (userData) => {
      Cookies.set(clientConfig.userIdName, userData.id, { expires: clientConfig.tokenExpiry });
      Cookies.set(clientConfig.authTokenName, userData.jwtAuthToken, {
        expires: clientConfig.tokenExpiry,
      });
      Cookies.set(clientConfig.refreshTokenName, userData.jwtRefreshToken, {
        expires: clientConfig.tokenExpiry,
      });
      memoryAuthToken = userData.jwtAuthToken;
      authTokenSubject.next(memoryAuthToken);
      memoryRefreshToken = userData.jwtRefreshToken;
      memoryUserId = userData.id;
    },

    logoutUser: () => {
      Cookies.remove(clientConfig.userIdName);
      Cookies.remove(clientConfig.authTokenName);
      Cookies.remove(clientConfig.refreshTokenName);
      memoryAuthToken = null;
      authTokenSubject.next(memoryAuthToken);
      memoryRefreshToken = null;
    },
  };
})();
export default auth;

export const isTokenExpiredOrInvalid = (token) => {
  if (!token) {
    return true;
  }
  const tokenData = jwtDecode(token);
  return tokenData.exp * 1000 < Date.now();
};

// export const fetchNewAccessToken = async (currentRefreshToken, authToken) => {
//   if (!authToken || !isTokenExpiredOrInvalid(authToken)) {
//     return authToken;
//   }

//   try {
//     console.log('Trying to refresh');
//     const fetchResult = await fetch(clientConfig.graphqlUrl, {
//       method: 'POST',
//       // headers: { 'Content-Type': 'application/json', credentials: 'include' },
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         query: `
//         mutation refreshJwtAuthToken {
//           refreshJwtAuthToken(input: {
//               clientMutationId: "${uuid()}",
//               jwtRefreshToken: "${currentRefreshToken}"
//           }) {
//               authToken
//           }
//         }
//       `,
//       }),
//     });

//     const refreshResponse = await fetchResult.json();

//     console.log(
//       `Refresh token response: ${
//         refreshResponse.data && refreshResponse.data.refreshJwtAuthToken
//           ? refreshResponse.data.refreshJwtAuthToken.authToken
//           : ''
//       }`
//     );

//     if (!refreshResponse?.data?.refreshJwtAuthToken?.authToken) {
//       return null;
//     }

//     const newToken = refreshResponse.data.refreshJwtAuthToken.authToken;
//     // if (process.browser) {
//     //   Cookies.set(clientConfig.authTokenName, newToken, { expires: clientConfig.tokenExpiry });
//     // }
//     auth.setAuthToken(newToken);

//     return refreshResponse.data.refreshJwtAuthToken.authToken;
//   } catch (e) {
//     console.error('Failed to fetch fresh access token', e);
//   }
// };

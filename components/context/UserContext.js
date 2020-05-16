import React, { useState, useEffect, createContext } from 'react';
import Cookies from 'js-cookie';

import clientConfig from '../../clientConfig';

export const UserContext = createContext();

export const UserProvider = (props) => {
  // ------- Current User ------- //
  const [currentUser, setCurrentUser] = useState(null);

  const loginUser = (userData) => {
    // save user id and auth token to context
    setCurrentUser({
      id: userData.id,
      name: userData.nicename,
      token: userData.jwtAuthToken,
      tokenExpiry: userData.jwtAuthExpiration,
    });

    // Save user id, auth token and refresh token to cookies to be able to access them
    // in the getInitialProps function of the myAccount component and in withApollo.
    // TODO: Find out how to use http only cookie or app storage for id and auth token.
    Cookies.set(clientConfig.userIdName, userData.id);
    Cookies.set(clientConfig.authTokenName, userData.jwtAuthToken);
    Cookies.set(clientConfig.refreshTokenName, userData.jwtRefreshToken);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    Cookies.remove(clientConfig.userIdName);
    Cookies.remove(clientConfig.authTokenName);
    Cookies.remove(clientConfig.refreshTokenName);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

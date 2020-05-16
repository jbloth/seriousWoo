import { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import Cookies from 'js-cookie';
import cookies from 'next-cookies';
import gql from 'graphql-tag';

import { UserContext } from '../components/context/UserContext';
import GET_USER_DATA from '../queries/get-user-data';
import { fetchNewAccessToken } from '../lib/auth';
import clientConfig from '../clientConfig';
import Button from '../components/Button';

const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;

const myAccount = ({ id, token, refreshToken }) => {
  const { logoutUser } = useContext(UserContext);
  Cookies.set(clientConfig.authTokenName, token);

  // query user data
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { id },
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  const [logout, { data: logoutData }] = useMutation(LOGOUT);

  return (
    <div className="account-page section">
      <h1 className="account-title">My Account</h1>

      {loading && <div className="loading-msg">Loading...</div>}
      {error && <div className="error-msg">{`Could not load data. Error: ${error}`}</div>}

      {data && data.user && (
        <div className="user-data">
          {data.user.name && <p>Howdy {data.user.name}!</p>}
          <h2 className="details-main-title">Account Details</h2>
          <p>First Name: {data.user.firstName ? data.user.firstName : ''}</p>
          <p>Last Name: {data.user.lastName ? data.user.lastName : ''}</p>
          <p>Email: {data.user.email ? data.user.email : ''}</p>
        </div>
      )}

      {data && data.customer && (
        <div className="customer-details">
          {data.customer.billing && (
            <div className="user-datail-block">
              <h3 className="details-title">Billing Address</h3>
              {data.customer.billing.firstName && (
                <p>First Name: {data.customer.billing.firstName}</p>
              )}
              {data.customer.billing.lastName && <p>Last Name: {data.customer.billing.lastName}</p>}
            </div>
          )}
        </div>
      )}

      <Button
        onClick={() => {
          logoutUser();
          logout();
          Router.push('/login');
        }}
      >
        LOG OUT
      </Button>

      <style jsx>{`
        .account-page {
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

myAccount.getInitialProps = async (ctx) => {
  // get auth token and user id from cookies
  let {
    [clientConfig.authTokenName]: token,
    [clientConfig.refreshTokenName]: refreshToken,
    [clientConfig.userIdName]: userId,
  } = cookies(ctx);

  const id = userId ? userId : null;

  // Refresh auth token if it is expired.
  if (token && refreshToken) {
    token = await fetchNewAccessToken(refreshToken, token);
  }

  // Redirect to login page id there is no auth token
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return {};
  }

  if (!token) {
    Router.push('/login');
  }

  return { id, token, refreshToken };
};

export default myAccount;

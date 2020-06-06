import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';
import Cookies from 'js-cookie';
import cookies from 'next-cookies';

import { withApollo } from 'react-apollo';

// import { logoutUser } from '../lib/auth';
import { colors, breakPoints } from '../styles/theme';
import GET_USER_DATA from '../queries/get-user-data';
import { countryCodeToName } from '../lib/functions';
import auth from '../lib/auth';
// import { fetchNewAccessToken } from '../lib/auth';
import clientConfig from '../clientConfig';
import Tabs from '../components/Tabs';
import Button from '../components/Button';
import OrderOverview from '../components/OrderOverview';
import EditUserModal from '../components/EditUserModal';
import EditAddressModal from '../components/EditAddressModal';

const myAccount = (props) => {
  const { id, token, client } = props;

  const [editUserModalActive, setEditUserModalActive] = useState(false);
  const [editAddressModalActive, setEditAddressModalActive] = useState(false);

  /* On page load, the token comes from (and is refreshed in ) getInitialProps
   *  (because I can't figure out how to get and set cookies in ApolloLinks, so
   *  the token refresh is done on every component that needs a token), but some
   *  child components may trigger a refresh themselves. In this case we have to
   *  update the token here, hence the useState.
   */
  const [authToken, setAuthToken] = useState(token);

  // TODO: Useeffect ?
  Cookies.set(clientConfig.authTokenName, authToken, { expires: clientConfig.tokenExpiry }); // TODO

  // query user data
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { id },
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  let user = null,
    customer = null,
    billing = null,
    shipping = null,
    orders = null;

  if (data) {
    ({ user = null, customer = null } = data);
  }

  if (customer) {
    ({ billing, shipping, orders } = customer);
  }

  return (
    <div className="account-page section">
      <h1 className="account-title">My Account</h1>

      {loading && <div className="loading-msg">Loading...</div>}
      {error && <div className="error-msg">{`Could not load data. Error: ${error}`}</div>}

      <Tabs>
        <div className="tab" name="General">
          {user ? (
            <div className="user-data data-container">
              <h2 className="details-main-title">Account Details</h2>
              <p className="row">
                <span className="row-name">Name: </span>
                <span>{user.firstName ? user.firstName + ' ' : ''}</span>
                <span>{user.lastName ? user.lastName : ''}</span>
              </p>
              <p className="row">
                <span className="row-name">Username: </span>
                {user.username ? user.username : ''}
              </p>
              <p className="row">
                <span className="row-name">Email: </span>
                {user.email ? user.email : ''}
              </p>

              <div className="buttons-container">
                <div className="button-wrapper">
                  <Button onClick={() => setEditUserModalActive(true)}>EDIT</Button>
                </div>
              </div>

              <EditUserModal
                setAuthToken={setAuthToken}
                id={id}
                initialData={user}
                active={editUserModalActive}
                closeModal={() => setEditUserModalActive(false)}
              />
            </div>
          ) : (
            <p>No information available</p>
          )}
        </div>

        <div className="tab" name="Addresses">
          <div className="addresses-container data-container">
            {billing ? (
              <div className="address-block user-datail-block">
                <h2 className="details-title">Billing Address</h2>
                <p className="row">
                  <span className="row-name">Name: </span>
                  <span>{billing.firstName ? billing.firstName + ' ' : ''}</span>
                  <span>{billing.lastName ? billing.lastName : ''}</span>
                </p>
                <p className="row">
                  <span className="row-name">Address: </span>
                  <span>{billing.address1 ? billing.address1 : ''}</span>
                </p>
                {billing.address2 && (
                  <p className="row">
                    <span className="row-name"> </span>
                    <span> billing.address2 </span>
                  </p>
                )}
                <p className="row">
                  <span className="row-name">Post Code: </span>
                  {billing.postcode ? billing.postcode : ''}
                </p>
                <p className="row">
                  <span className="row-name">City: </span>
                  {billing.city ? billing.city : ''}
                </p>
                {billing.state && (
                  <p className="row">
                    <span className="row-name">State</span>
                    <span> billing.state </span>
                  </p>
                )}
                <p className="row">
                  <span className="row-name">Country: </span>
                  {billing.country ? countryCodeToName(billing.country) : ''}
                </p>
                <p className="row">
                  <span className="row-name">Email: </span>
                  {billing.email ? billing.email : ''}
                </p>
                <p className="row">
                  <span className="row-name">Phone: </span>
                  {billing.phone ? billing.phone : ''}
                </p>
              </div>
            ) : (
              <p>No information available</p>
            )}

            {shipping ? (
              <div className="address-block user-datail-block">
                <h2 className="details-title">Shipping Address</h2>
                <p className="row">
                  <span className="row-name">Name: </span>
                  <span>{shipping.firstName ? shipping.firstName + ' ' : ''}</span>
                  <span>{shipping.lastName ? shipping.lastName : ''}</span>
                </p>
                <p className="row">
                  <span className="row-name">Address: </span>
                  <span>{shipping.address1 ? shipping.address1 : ''}</span>
                </p>
                {shipping.address2 && (
                  <p className="row">
                    <span className="row-name"> </span>
                    <span> shipping.address2 </span>
                  </p>
                )}
                <p className="row">
                  <span className="row-name">Post Code: </span>
                  {shipping.postcode ? shipping.postcode : ''}
                </p>
                <p className="row">
                  <span className="row-name">City: </span>
                  {shipping.city ? shipping.city : ''}
                </p>
                {shipping.state && (
                  <p className="row">
                    <span className="row-name">State</span>
                    <span> shipping.state </span>
                  </p>
                )}
                <p className="row">
                  <span className="row-name">Country: </span>
                  {shipping.country ? countryCodeToName(shipping.country) : ''}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="buttons-container">
            <div className="button-wrapper">
              <Button onClick={() => setEditAddressModalActive(true)}>EDIT</Button>
            </div>
          </div>

          <EditAddressModal
            setAuthToken={setAuthToken}
            id={id}
            initialData={customer}
            active={editAddressModalActive}
            closeModal={() => setEditAddressModalActive(false)}
          />
        </div>

        <div className="tab" name="Orders">
          {orders ? (
            <div className="orders-data data-container">
              <h2 className="details-main-title">Orders</h2>
              <div className="orders-container">
                {orders.nodes.map((order, idx) => {
                  return <OrderOverview key={idx} order={order} />;
                })}
              </div>
            </div>
          ) : (
            <p>No orders.</p>
          )}
        </div>
      </Tabs>

      <div className="buttons-container">
        <div className="button-wrap">
          <Button
            extraClass="btn--grow"
            onClick={() => {
              auth.logoutUser();
              client.resetStore();
              Router.push('/login');
            }}
          >
            LOG OUT
          </Button>
        </div>
      </div>

      <style jsx>{`
        .account-page {
          flex-direction: column;
        }

        .tab {
          padding: 1rem 2rem;
        }

        .data-container {
          width: 100%;
          margin-bottom: 1rem;
        }

        h2 {
          margin-bottom: 2rem;
        }

        .addresses-container {
          display: flex;
        }

        .address-block {
          width: 50%;
          flex-grow: 1;
        }

        .row-name {
          display: inline-block;
          width: 10rem;
          color: rgb(${colors.orange});
        }

        .buttons-container {
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
        }

        .button-wrap {
          width: 16rem;
        }

        .button-wrap {
          margin-top: 2rem;
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .tab {
            padding: 1rem 1rem;
          }

          .addresses-container {
            flex-direction: column;
          }

          .address-block {
            width: 100%;
            padding-bottom: 2rem;
            font-size: 1.4rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .tab {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

myAccount.getInitialProps = async (ctx) => {
  // get auth token and user id from cookies
  // get the authentication token from cookie
  let token = null;
  let refreshToken = null;
  let id = null;
  if (ctx) {
    ({
      [clientConfig.authTokenName]: token,
      [clientConfig.refreshTokenName]: refreshToken,
      [clientConfig.userIdName]: id,
    } = cookies(ctx));
  } else {
    token = Cookies.get(clientConfig.authTokenName);
    refreshToken = Cookies.get(clientConfig.refreshTokenName);
    id = Cookies.get(clientConfig.userIdName);
  }

  // Redirect to login page if there is no auth token
  if (ctx.req && !token) {
    console.log('server redirect');

    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return { token: null };
  }

  if (!token) {
    console.log('client redirect');
    Router.push('/login');
    return { token: null };
  }

  return { id, token };
};

export default withApollo(myAccount);

import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';
import Cookies from 'js-cookie';
import cookies from 'next-cookies';

import { logoutUser } from '../lib/auth';
import { colors, breakPoints } from '../styles/theme';
import GET_USER_DATA from '../queries/get-user-data';
import { countryCodeToName } from '../lib/functions';
import { fetchNewAccessToken } from '../lib/auth';
import clientConfig from '../clientConfig';
import Tabs from '../components/Tabs';
import Button from '../components/Button';
import OrderOverview from '../components/OrderOverview';
import EditUserModal from '../components/EditUserModal';
import EditAddressModal from '../components/EditAddressModal';

const myAccount = ({ id, token }) => {
  const [editUserModalActive, setEditUserModalActive] = useState(false);
  const [editAddressModalActive, setEditAddressModalActive] = useState(true);

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
                <span className="row-name">Username: </span> {user.username ? user.username : ''}
              </p>
              <p className="row">
                <span className="row-name">Email: </span> {user.email ? user.email : ''}
              </p>

              <div className="buttons-container">
                <div className="button-wrapper">
                  <Button onClick={() => setEditUserModalActive(true)}>EDIT</Button>
                </div>
              </div>

              <EditUserModal
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

                <div className="buttons-container">
                  <div className="button-wrapper">
                    <Button onClick={() => setEditAddressModalActive(true)}>EDIT</Button>
                  </div>
                </div>

                <EditAddressModal
                  id={id}
                  initialData={customer}
                  active={editAddressModalActive}
                  closeModal={() => setEditAddressModalActive(false)}
                />
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
                <p className="row">
                  <span className="row-name">Email: </span> {shipping.email ? shipping.email : ''}
                </p>
                <p className="row">
                  <span className="row-name">Phone: </span> {shipping.phone ? shipping.phone : ''}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
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

      <div className="logout-wrap">
        <Button
          onClick={() => {
            logoutUser();
            Router.push('/login');
          }}
        >
          LOG OUT
        </Button>
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
        }

        .button-wrapper {
          width: 10rem;
        }

        .logout-wrap {
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

          .row {
          }
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
  token = token ? token : null;

  // Refresh auth token if it is expired.
  if (token && refreshToken) {
    token = await fetchNewAccessToken(refreshToken, token);
    // Seems to work on inital page render. Not sure why.
    Cookies.set(clientConfig.authTokenName, token);
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

  return { id, token, refreshToken };
};

export default myAccount;

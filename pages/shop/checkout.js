import { useQuery } from '@apollo/react-hooks';
import Cookies from 'js-cookie';
import cookies from 'next-cookies';

import { colors } from '../../styles/theme';
import clientConfig from '../../clientConfig';
import { fetchNewAccessToken } from '../../lib/auth';
import GET_USER_DATA from '../../queries/get-user-data';
import CheckoutForm from '../../components/CheckoutForm';

const Checkout = ({ categorySlug, id, token }) => {
  // If user is logged in, load user data to pre-populate
  // checkout-form
  let userData = null;
  const doSkip = !(!!id && !!token);
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { id },
    skip: doSkip,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  if (data) {
    userData = data;
  }

  return (
    <section className="section checkout-page">
      <h1>Checkout</h1>
      <CheckoutForm userData={userData} />
      <style jsx>{`
        .checkout-page {
          flex-direction: column;
        }

        h1 {
          color: ${colors.lightblue};
        }
      `}</style>
    </section>
  );
};

Checkout.getInitialProps = async (ctx) => {
  // get auth token and user id from cookies
  let {
    [clientConfig.authTokenName]: token,
    [clientConfig.refreshTokenName]: refreshToken,
    [clientConfig.userIdName]: userId,
  } = cookies(ctx);

  const id = userId ? userId : null;
  token = token ? token : null;
  refreshToken = refreshToken ? refreshToken : null;

  // Refresh auth token if it is expired.
  if (token && refreshToken) {
    token = await fetchNewAccessToken(refreshToken, token);
    // Seems to work on inital page render. Not sure why.
    Cookies.set(clientConfig.authTokenName, token);
  }

  return { id, token };
};
export default Checkout;

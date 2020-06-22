import { useQuery } from '@apollo/react-hooks';

import { colors, breakPoints } from '../../styles/theme';
import auth from '../../lib/auth';
import GET_USER_DATA from '../../queries/get-user-data';
import CheckoutForm from '../../components/CheckoutForm';

const Checkout = () => {
  const id = auth.getUserId();
  const token = auth.getAuthToken();

  // If user is logged in, load user data to pre-populate checkout-form
  let userData = null;
  const doSkip = !(!!id && !!token);
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { id },
    skip: doSkip,
  });

  if (data) {
    userData = data;
  }

  return (
    <section className="section checkout-page">
      <h1>Checkout</h1>
      <p className="no-fullfill-msg">
        Currently this site only serves demonstration purposes and it is not possible to place
        orders. The data you enter here will be transmitted to our server, however orders (and all
        related data) will not be fullfilled and deleted on a regular basis. For paypal payments, we
        use a paypal sandbox which means that no money will be transferred.
      </p>
      <CheckoutForm userData={userData} />
      <style jsx>{`
        .checkout-page {
          flex-direction: column;
        }

        .no-fullfill-msg {
          padding: 1rem 4rem;
          text-align: justify;
        }

        h1 {
          color: ${colors.lightblue};
        }

        @media only screen and (max-width: ${breakPoints.bp_large}) {
          .no-fullfill-msg {
            padding: 1rem 0 3rem 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Checkout;

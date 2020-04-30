import { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AppContext } from '../components/context/AppContext';
import { colors, fonts } from '../styles/theme';
import { getFormattedCart } from '../lib/functions';
import GET_CART from '../queries/get-cart';
import CheckoutFormInputs from './ChckoutFormInputs';
import CartOverview from './CartOverview';

const CheckoutForm = () => {
  const initialState = {
    firstName: 'Trudi',
    lastName: 'Flaushball',
    country: 'DE',
    address1: 'Liebigstraße 3',
    address2: '',
    city: 'Köln',
    postcode: '50899',
    phone: '1234678',
    email: 'trudi@flausch.com',
    createAccount: false,
    orderNotes: '',
    paymentMethod: '',
    errors: null,
  };
  const { cart, setCart } = useContext(AppContext);
  const [input, setInput] = useState(initialState);

  // Get Cart Data from backend
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    ssr: false,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('seriousCart', JSON.stringify(updatedCart));

      // Update cart in context
      setCart(updatedCart);
    },
  });

  const handleChange = (e) => {
    const newState = { ...input, [event.target.name]: event.target.value };
    setInput(newState);
  };

  return (
    <>
      {cart !== null && cart.products.length > 0 ? (
        <form className="checkout-form" onSubmit={() => {}}>
          <div className="billing-adress">
            <h2>Billing Adress</h2>
            <CheckoutFormInputs initialValues={input} handleChange={handleChange} />
          </div>
          <div className="cart-and-payment">
            <div className="cart-overview">
              <h2>Your Cart</h2>
              <CartOverview cart={cart} />
            </div>
            <div className="payment-methods">
              <h3>Payment</h3>
            </div>
          </div>
        </form>
      ) : (
        ''
      )}
      <style jsx>{`
        .checkout-form {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 2rem 4rem;
        }

        h2,
        h3 {
          color: ${colors.darkpink};
          margin-bottom: 2rem;
        }

        .billing-adress,
        .cart-and-payment {
          width: 46%;
        }
      `}</style>
    </>
  );
};

export default CheckoutForm;

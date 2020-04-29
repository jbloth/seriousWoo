import { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AppContext } from '../components/context/AppContext';
import { colors, fonts } from '../styles/theme';
import GET_CART from '../queries/get-cart';
import CheckoutFormInputs from './ChckoutFormInputs';
import CartOverview from './Cart-Overview';

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
          width: 100%;
          padding: 2rem;
        }

        h2,
        h3 {
          color: ${colors.textblue};
        }

        .billing-adress,
        cart-and-payment {
          flex-grow: 0.5;
          padding-right: 8rem;
        }
      `}</style>
    </>
  );
};

export default CheckoutForm;

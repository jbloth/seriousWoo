import { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AppContext } from '../components/context/AppContext';
import { colors, fonts } from '../styles/theme';
import { getFormattedCart } from '../lib/functions';
import validateAndSanitizeOrder from '../lib/validateAndSanitizeOrder';
import GET_CART from '../queries/get-cart';
import CheckoutFormInputs from './CheckoutFormInputs';
import CartOverview from './CartOverview';
import Button from './Button';

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
    shipToDifferentAddress: false,
  };

  const initialShipping = {
    firstName: 'Barnabas',
    lastName: 'Brock',
    country: 'DE',
    address1: 'Horn 3',
    address2: '',
    city: 'Köln',
    postcode: '50899',
    phone: '1234678',
    email: 'barn@flausch.com',
    errors: null,
  };

  const { cart, setCart } = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [shippingAddress, setShippingAddress] = useState(initialShipping);

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
      console.log(cart);
    },
  });

  const handleChange = (e) => {
    const newState = { ...input, [event.target.name]: event.target.value };
    setInput(newState);
  };

  const handleSubmit = (e) => {
    event.preventDefault();
    const valiadtedData = validateAndSanitizeOrder(input);

    if (!valiadtedData.isValid) {
      setInput({ ...input, errors: valiadtedData.errors });
      return;
    }
  };

  return (
    <>
      {cart !== null && cart.products.length > 0 ? (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="billing-adress">
            <h2>Billing Adress</h2>
            <CheckoutFormInputs inputs={input} handleChange={handleChange} />
            <label className="checkbox-label">
              <input
                className="checkbox"
                type="checkbox"
                name="shipToDifferentAddress"
                value={input.shipToDifferentAddress}
                onChange={(e) => setInput({ ...input, shipToDifferentAddress: e.target.checked })}
              />
              Ship to a different address
            </label>

            {input.shipToDifferentAddress && (
              <>
                <br />
                <br />
                <h2>Shipping Adress</h2>
                <CheckoutFormInputs inputs={input} showNotes={false} onChange={handleChange} />
              </>
            )}
          </div>
          <div className="cart-and-payment">
            <div className="cart-overview">
              <h2>Your Cart</h2>
              <CartOverview cart={cart} />
            </div>
            <div className="payment-methods">
              <h3>Payment</h3>
            </div>
            <div className="submit-wrap">
              <Button className="btn--big">PLACE ORDER</Button>
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
          display: flex;
          flex-direction: column;
        }

        .checkbox {
          margin-right: 5px;
          width: 15px;
          height: 15px;
          border-radius: 0;
          border: 1px solid ${colors.violet};
        }

        .submit-wrap {
          align-self: flex-end;
        }
      `}</style>
    </>
  );
};

export default CheckoutForm;

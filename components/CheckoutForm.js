import { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AppContext } from '../components/context/AppContext';
import { colors, fonts } from '../styles/theme';
import { getFormattedCart, createCheckoutMutationInput } from '../lib/functions';
import validateAndSanitizeOrder from '../lib/validateAndSanitizeOrder';
import GET_CART from '../queries/get-cart';
import CHECKOUT_MUTATION from '../mutations/checkout';
import CheckoutFormInputs from './CheckoutFormInputs';
import CartOverview from './CartOverview';
import PaymentSelector from './PaymentSelector';
import Button from './Button';
import OrderSuccess from './OrderSuccess';

const CheckoutForm = () => {
  const initialBilling = {
    firstName: 'Trudi',
    lastName: 'Flaushball',
    country: 'DE',
    address1: 'Liebigstraße 3',
    address2: '',
    city: 'Köln',
    postcode: '50899',
    phone: '1234678',
    email: 'trudi@flausch.com',
    orderNotes: '',
    errors: null,
  };

  const initialShipping = {
    firstName: '',
    lastName: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    phone: '',
    email: '',
    errors: null,
  };

  const initialOrderSettings = {
    createAccount: false,
    paymentMethod: '',
    shipToDifferentAddress: false,
    errors: null,
  };

  const { cart, setCart } = useContext(AppContext);
  const [billingAddress, setBillingAddress] = useState(initialBilling);
  const [shippingAddress, setShippingAddress] = useState(initialShipping);
  const [orderSettings, setOrderSettings] = useState(initialOrderSettings);

  const handleChange_billing = (e) => {
    const newState = { ...billingAddress, [event.target.name]: event.target.value };
    setBillingAddress(newState);
  };

  const handleChange_shipping = (e) => {
    const newState = { ...shippingAddress, [event.target.name]: event.target.value };
    setShippingAddress(newState);
  };

  const handleChange_orderSettings = (e) => {
    const newState = { ...orderSettings, [event.target.name]: event.target.value };
    setOrderSettings(newState);
  };

  // This is the data that will be sent to woocommerce on checkout
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  useEffect(() => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      checkout();
    }
  }, [orderData]);

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

  // Checkout Mutation
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading, error: checkoutError },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData,
    },
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  const handleSubmit = (e) => {
    event.preventDefault();

    // Validate shipping address if it is different from billing address
    let validatededShippingData = null;
    if (orderSettings.shipToDifferentAddress) {
      validatededShippingData = validateAndSanitizeOrder(shippingAddress);

      if (!validatededShippingData.isValid) {
        setShippingAddress({ ...shippingAddress, errors: validatededShippingData.errors });
      }
    }

    // Validate billing address
    let validatededBillingData = validateAndSanitizeOrder(billingAddress);
    if (!validatededBillingData.isValid) {
      setBillingAddress({ ...billingAddress, errors: validatededBillingData.errors });
    }

    // Return if the billing- or the shipping-address contains invalid data.
    if (
      !validatededBillingData.isValid ||
      (validatededShippingData && !validatededBillingData.isValid)
    )
      return;

    const checkoutData = createCheckoutMutationInput(
      billingAddress,
      orderSettings,
      shippingAddress
    );
    setOrderData(checkoutData);

    setRequestError(null);
  };

  return (
    <>
      {cart !== null && cart.products.length > 0 ? (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="billing-adress">
            <h2>Billing Adress</h2>
            <CheckoutFormInputs inputs={billingAddress} handleChange={handleChange_billing} />
            <label className="checkbox-label">
              <input
                className="checkbox"
                type="checkbox"
                name="shipToDifferentAddress"
                checked={orderSettings.shipToDifferentAddress}
                onChange={(e) =>
                  setOrderSettings({ ...orderSettings, shipToDifferentAddress: e.target.checked })
                }
              />
              Ship to a different address
            </label>

            {orderSettings.shipToDifferentAddress && (
              <>
                <br />
                <br />
                <h2>Shipping Adress</h2>
                <CheckoutFormInputs
                  inputs={shippingAddress}
                  showNotes={false}
                  handleChange={handleChange_shipping}
                />
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
              <PaymentSelector input={orderSettings} handleOnChange={handleChange_orderSettings} />
            </div>
            <div className="submit-wrap">
              {checkoutLoading ? (
                <p>Processing Order...</p>
              ) : (
                <Button extraClass="btn--big">PLACE ORDER</Button>
              )}
            </div>
            {requestError && (
              <div className="error-wrap">
                <p className="error-msg">Order could not be processed. Please try again.</p>
                <p>Error : {requestError} </p>
              </div>
            )}
          </div>
        </form>
      ) : (
        ''
      )}

      <OrderSuccess response={checkoutResponse} />

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

        .error-msg {
          margin: 1rem 0;
          color: ${colors.orange};
        }
      `}</style>
    </>
  );
};

export default CheckoutForm;

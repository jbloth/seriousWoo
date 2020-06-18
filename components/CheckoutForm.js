import { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AppContext } from '../components/context/AppContext';
import { colors, breakPoints } from '../styles/theme';
import { getFormattedCart, createCheckoutMutationInput } from '../lib/functions';
import validateAndSanitizeOrder from '../lib/validateAndSanitizeOrder';
import validateAndSanitizeOrderShipping from '../lib/validateAndSanitizeOrderShipping';
import GET_CART from '../queries/get-cart';
import CHECKOUT_MUTATION from '../mutations/checkout';
import CheckoutFormInputs from './CheckoutFormInputs';
import CartOverview from './CartOverview';
import PaymentSelector from './PaymentSelector';
import ShippingSelector from './ShippingSelector';
import Button from './Button';
import OrderSuccess from './OrderSuccess';

const CheckoutForm = ({ userData }) => {
  const { cart, setCart } = useContext(AppContext);

  // Default form contents
  let initialBilling = {
    firstName: '',
    lastName: '',
    country: 'AT',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    phone: '',
    email: '',
    orderNotes: '',
    errors: null,
  };

  let initialShipping = {
    firstName: '',
    lastName: '',
    country: 'AT',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    errors: null,
  };

  const initialOrderSettings = {
    createAccount: false,
    paymentMethod: '',
    shipToDifferentAddress: false,
    shippingMethod: cart?.chosenShippingMethod ? cart.chosenShippingMethod : '',
    errors: null,
  };

  // If a user is logged in, the checkout-page should have passed down
  // user data to pre-populate the checkout form
  if (userData && userData.customer && userData.customer.billing) {
    const billing = userData.customer.billing;
    initialBilling = {
      firstName: billing.firstName ? billing.firstName : '',
      lastName: billing.lastName ? billing.lastName : '',
      country: billing.country ? billing.country : 'AT',
      address1: billing.address1 ? billing.address1 : '',
      address2: billing.address2 ? billing.address2 : '',
      city: billing.city ? billing.city : '',
      postcode: billing.postcode ? billing.postcode : '',
      phone: billing.phone ? billing.phone : '',
      email: billing.email ? billing.email : '',
      orderNotes: billing.orderNotes ? billing.orderNotes : '',
      errors: null,
    };
  }

  if (userData && userData.customer && userData.customer.shipping) {
    const shipping = userData.customer.shipping;
    initialShipping = {
      firstName: shipping.firstName ? shipping.firstName : '',
      lastName: shipping.lastName ? shipping.lastName : '',
      country: shipping.country ? shipping.country : 'AT',
      address1: shipping.address1 ? shipping.address1 : '',
      address2: shipping.address2 ? shipping.address2 : '',
      city: shipping.city ? shipping.city : '',
      postcode: shipping.postcode ? shipping.postcode : '',
      errors: null,
    };
  }

  const [billingAddress, setBillingAddress] = useState(initialBilling);
  const [shippingAddress, setShippingAddress] = useState(initialShipping);
  const [orderSettings, setOrderSettings] = useState(initialOrderSettings);

  // Use a different onChange for billing, shipping and other settings
  const handleChange_billing = (event) => {
    const newState = { ...billingAddress, [event.target.name]: event.target.value };
    setBillingAddress(newState);
  };

  const handleChange_shipping = (event) => {
    const newState = { ...shippingAddress, [event.target.name]: event.target.value };
    setShippingAddress(newState);
  };

  const handleChange_orderSettings = (event) => {
    const newState = { ...orderSettings, [event.target.name]: event.target.value };
    setOrderSettings(newState);
  };

  // This is the data that will be sent to woocommerce on checkout
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  // The checkout mutation will be invoked once orderData changes
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
      // Update cart in context
      setCart(updatedCart);
      setOrderSettings({ ...orderSettings, shippingMethod: updatedCart.chosenShippingMethod });
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
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        setRequestError(error.graphQLErrors[0].message);
      }
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    event.preventDefault();

    // Check if a payment method has been selected
    let orderDataValid = true;
    if (!orderSettings.paymentMethod) {
      orderDataValid = false;
      setOrderSettings({
        ...orderSettings,
        errors: { paymentMethod: 'Please select a payment method' },
      });
    }

    // Validate shipping address if it is different from billing address
    let validatededShippingData = null;
    if (orderSettings.shipToDifferentAddress) {
      validatededShippingData = validateAndSanitizeOrderShipping(shippingAddress);
    } else {
      validatededShippingData = validateAndSanitizeOrderShipping(billingAddress);
    }

    if (!validatededShippingData.isValid) {
      setShippingAddress({ ...shippingAddress, errors: validatededShippingData.errors });
    }

    // Validate billing address
    let validatededBillingData = validateAndSanitizeOrder(billingAddress);
    if (!validatededBillingData.isValid) {
      setBillingAddress({ ...billingAddress, errors: validatededBillingData.errors });
    }

    // Return if the billing- or the shipping-address contains invalid data.
    if (
      !orderDataValid ||
      !validatededBillingData.isValid ||
      (validatededShippingData && !validatededBillingData.isValid)
    ) {
      return;
    }

    const checkoutData = createCheckoutMutationInput(
      validatededBillingData.sanitizedData,
      orderSettings,
      validatededShippingData.sanitizedData
    );
    setOrderData(checkoutData);

    setRequestError(null);
  };

  return (
    <>
      {cart !== null && cart.products.length > 0 ? (
        <form className="checkout-form" method="post" onSubmit={handleSubmit}>
          <div className="billing-adress">
            <h2>Billing Adress</h2>
            <CheckoutFormInputs
              inputs={billingAddress}
              handleChange={handleChange_billing}
              texInputExtraClass="textInput--bottomOnly"
            />
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
                  texInputExtraClass="textInput--bottomOnly"
                  isShipping={true}
                />
              </>
            )}
          </div>
          <div className="cart-and-payment">
            <div className="cart-overview form-section">
              <h2>Your Cart</h2>
              <CartOverview cart={cart} />
            </div>

            <div className="shipping-container form-section">
              <h3>Shipping</h3>
              {cart.availableShippingMethods &&
                cart.availableShippingMethods.map((shipment, idx) => {
                  return (
                    <div className="package-details" key={idx}>
                      <h5>Available rates:</h5>
                      <ShippingSelector
                        rates={shipment.rates}
                        refetch={refetch}
                        initialShippingId={cart.chosenShippingMethod}
                      />
                    </div>
                  );
                })}
            </div>

            <div className="totals-container form-section">
              <h3>Total</h3>
              <div className="totals"></div>
              <p className="totals-line">
                <span className="totals-line-text">Subtotal:</span>
                <span className="totals-line-price">{cart.subtotal}</span>
              </p>
              <p className="totals-line">
                <span className="totals-line-text">Shipping:</span>
                <span className="totals-line-price">{cart.shippingTotal}</span>
              </p>
              <p className="total">
                <span className="total-text">Total:</span>
                <span className="total-price">{cart.total}</span>
              </p>
            </div>

            <div className="payment-methods-container form-section">
              <h3>Payment</h3>
              <PaymentSelector input={orderSettings} handleOnChange={handleChange_orderSettings} />
              {orderSettings.errors && orderSettings.errors.paymentMethod && (
                <div className="error-msg-payment">{orderSettings.errors.paymentMethod}</div>
              )}
            </div>
            <div className="submit-wrap">
              {checkoutLoading ? (
                <p>Processing Order...</p>
              ) : (
                <Button type="submit" extraClass="btn--big">
                  PLACE ORDER
                </Button>
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
          color: rgb(${colors.darkpink});
          margin-bottom: 2rem;
        }

        .billing-adress,
        .cart-and-payment {
          width: 46%;
          display: flex;
          flex-direction: column;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .checkbox {
          margin-right: 5px;
          width: 15px;
          height: 15px;
          border-radius: 0;
          border: 1px solid rgb(${colors.violet});
        }

        .submit-wrap {
          align-self: flex-end;
          margin: 2rem 0;
        }

        .totals-line {
          text-align: right;
          font-size: 1.8rem;
        }

        .total {
          text-align: right;
          font-size: 2.4rem;
          font-weight: bold;
          border-top: 1px solid rgb(${colors.violet});
          border-bottom: 1px solid rgb(${colors.violet});
          margin-top: 0.5rem;
        }

        .total-text,
        .totals-line-text {
          color: rgb(${colors.orange});
        }

        .total-price,
        .totals-line-price {
          display: inline-block;
          color: rgb(${colors.textblue});
          margin-left: 2rem;
          min-width: 11rem;
        }

        .error-msg {
          margin: 1rem 0;
          color: rgb(${colors.orange});
        }

        .error-msg-payment {
          color: rgb(${colors.textred});
          font-size: 1.4rem;
        }

        @media only screen and (max-width: ${breakPoints.bp_large}) {
          .checkout-form {
            padding: 2rem 2rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .checkout-form {
            padding: 0;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .checkout-form {
            flex-direction: column;
          }

          .billing-adress {
            width: 100%;
          }

          .cart-and-payment {
            width: 100%;
            margin-top: 4rem;
          }
        }
      `}</style>
    </>
  );
};

export default CheckoutForm;

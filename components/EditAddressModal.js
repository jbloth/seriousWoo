import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import validateAndSanitizeEditAddressInput from '../lib/validateAndSanitizeEditAddressInput';
import UPDATE_CUSTOMER from '../mutations/update-customer';
import GET_USER_DATA from '../queries/get-user-data';
import CloseIcon from '../assets/icon-close_211652.svg';
import { colors, breakPoints } from '../styles/theme';
import CheckoutFormInputs from './CheckoutFormInputs';
import Button from './Button';

const EditAddressModal = ({ id, initialData, active, closeModal }) => {
  const billingAddress = initialData && initialData.billing ? initialData.billing : null;
  const shippingAddress = initialData && initialData.shipping ? initialData.shipping : null;

  let initialBilling = {
    firstName: billingAddress && billingAddress.firstName ? billingAddress.firstName : '',
    lastName: billingAddress && billingAddress.lastName ? billingAddress.lastName : '',
    country: billingAddress && billingAddress.country ? billingAddress.country : '',
    address1: billingAddress && billingAddress.address1 ? billingAddress.address1 : '',
    address2: billingAddress && billingAddress.address2 ? billingAddress.address2 : '',
    city: billingAddress && billingAddress.city ? billingAddress.city : '',
    postcode: billingAddress && billingAddress.postcode ? billingAddress.postcode : '',
    phone: billingAddress && billingAddress.phone ? billingAddress.phone : '',
    email: billingAddress && billingAddress.email ? billingAddress.email : '',
    orderNotes: billingAddress && billingAddress.orderNotes ? billingAddress.orderNotes : '',
    errors: null,
  };

  let initialShipping = {
    firstName: shippingAddress && shippingAddress.firstName ? shippingAddress.firstName : '',
    lastName: shippingAddress && shippingAddress.lastName ? shippingAddress.lastName : '',
    country: shippingAddress && shippingAddress.country ? shippingAddress.country : '',
    address1: shippingAddress && shippingAddress.address1 ? shippingAddress.address1 : '',
    address2: shippingAddress && shippingAddress.address2 ? shippingAddress.address2 : '',
    city: shippingAddress && shippingAddress.city ? shippingAddress.city : '',
    postcode: shippingAddress && shippingAddress.postcode ? shippingAddress.postcode : '',
    errors: null,
  };

  const [separateShipping, setSeparateShipping] = useState(true);
  const [billingFormData, setBillingFormData] = useState(initialBilling);
  const [shippingFormData, setShippingFormData] = useState(initialShipping);

  // Use a different onChange for billing, shipping and other settings
  const handleChange_billing = (event) => {
    const newState = { ...billingFormData, [event.target.name]: event.target.value };
    setBillingFormData(newState);
  };

  const handleChange_shipping = (event) => {
    const newState = { ...shippingFormData, [event.target.name]: event.target.value };
    setShippingFormData(newState);
  };

  const GET_CUSTOMER = gql`
    query Customer($id: ID!) {
      customer(id: $id) {
        id
        username
        firstName
        lastName
        email
        billing {
          firstName
          lastName
          address1
          address2
          city
          postcode
          state
          country
          email
          phone
        }
        shipping {
          firstName
          lastName
          address1
          address2
          postcode
          city
          state
          country
        }
      }
    }
  `;

  // Use login-mutation
  const [updateAddress, { data, loading, error: updateError }] = useMutation(UPDATE_CUSTOMER, {
    // update(cache, { data: { updateCustomer } }) {
    // try {
    //   let data = cache.readQuery({ query: GET_CUSTOMER, variables: { id } });
    //   // data.customer.billing = updateCustomer.billing;
    //   // data.customer.shipping = updateCustomer.shipping;
    //   cache.writeQuery({
    //     query: GET_CUSTOMER,
    //     variables: { id },
    //     data,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
    // },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validatededInput_billing = validateAndSanitizeEditAddressInput(billingFormData);
    if (!validatededInput_billing.isValid) {
      setBillingFormData({ ...billingFormData, errors: validatededInput_billing.errors });
    }

    const validatededInput_shipping = validateAndSanitizeEditAddressInput(shippingFormData, true);
    if (!validatededInput_shipping.isValid) {
      setShippingFormData({ ...shippingFormData, errors: validatededInput_shipping.errors });
    }

    if (!validatededInput_billing.isValid || !validatededInput_shipping.isValid) return;

    const updateAddressInput = {
      clientMutationId: 'Babbel',
      id,
      billing: validatededInput_billing.sanitizedData,
      shipping: validatededInput_shipping.sanitizedData,
    };

    await updateAddress({
      variables: { input: updateAddressInput },
      onError: (error) => {
        if (error) {
          console.log(error);
          return;
        }
      },
    });

    closeModal();
  };

  return (
    <div className={`background-modal ${active ? 'background-modal--active' : ''}`}>
      <div className="edit-user-modal">
        <div className="icon-wrapper close-icon">
          <CloseIcon onClick={closeModal} />
        </div>
        <div className="forms-container">
          <h2>Edit Addresses</h2>
          <form method="post" className="form" onSubmit={(e) => handleSubmit(e)}>
            <div className="address-container">
              <h4 className="adress-title">Billing Address</h4>
              <CheckoutFormInputs
                inputs={billingFormData}
                handleChange={handleChange_billing}
                showNotes={false}
                dontRequire={true}
              />
            </div>

            <label className="checkbox-label">
              <input
                className="checkbox"
                type="checkbox"
                name="separateShipping"
                checked={separateShipping}
                onChange={(e) => setSeparateShipping(e.target.checked)}
              />
              Use a different address for shipping
            </label>

            <div className="address-container">
              <h4 className="adress-title">Shipping Address</h4>
              <CheckoutFormInputs
                inputs={separateShipping ? shippingFormData : billingFormData}
                handleChange={separateShipping ? handleChange_shipping : () => {}}
                showNotes={false}
                dontRequire={true}
                texInputExtraClass={separateShipping ? '' : 'textInput--inactive'}
                passiveMode={!separateShipping}
                isShipping={true}
              />
            </div>

            <div className="row">
              <div className="buttons-container">
                <div className="button-wrapper">
                  <Button type="submit" extraClass="btn--big" disabled={loading ? 'disabled' : ''}>
                    {loading ? 'sending...' : 'SAVE'}
                  </Button>
                </div>
                <div className="button-wrapper">
                  <Button
                    extraClass="btn--big btn--inverted"
                    disabled={loading ? 'disabled' : ''}
                    onClick={(event) => {
                      event.preventDefault();
                      setBillingFormData(initialBilling);
                      setShippingFormData(initialShipping);
                      closeModal();
                    }}
                  >
                    DISCARD
                  </Button>
                </div>
              </div>
            </div>

            {updateError && (
              <div className="error-wrap">
                <p className="error-msg">{'Failed to update data.'}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .background-modal {
          display: none;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          position: fixed;
          background-color: rgba(${colors.bg}, 0.6);
        }

        .background-modal--active {
          display: block;
          z-index: 106;
        }

        .edit-user-modal {
          position: relative;
          top: 10%;
          margin: 0 auto;
          width: 60rem;
          background-color: rgb(${colors.lighterblue});
          padding: 6rem;
          height: 80vh;
        }

        .close-icon {
          font-size: 3rem;
          position: absolute;
          top: 3rem;
          right: 3rem;
          fill: rgb(${colors.darkpink});
          cursor: pointer;
        }

        .forms-container {
          height: 100%;
          overflow-y: scroll;
        }

        .address-container {
          padding: 3rem 0;
        }

        h4 {
          color: rgb(${colors.orange});
        }

        .textInput-wrap,
        .buttons-container {
          margin-top: 3rem;
        }

        .row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkbox {
          margin-right: 5px;
          width: 15px;
          height: 15px;
          border-radius: 0;
          border: 1px solid rgb(${colors.violet});
        }

        .buttons-container {
          width: 80%;
          display: flex;
          justify-content: space-between;
        }

        .button-wrapper {
          width: 16rem;
          margin: 0 1rem;
        }

        .error-wrap {
          margin: 2rem 0;
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .edit-user-modal {
            width: 50rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .edit-user-modal {
            width: 100%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .buttons-container {
            width: 100%;
          }

          .button-wrapper {
            margin: 0 1rem 0 0;
          }

          .button-wrapper:last-of-type {
            margin: 0 0 0 1rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .edit-user-modal {
            padding: 6rem 4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EditAddressModal;

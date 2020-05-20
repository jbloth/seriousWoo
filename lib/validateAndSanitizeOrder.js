import { isEmpty } from './functions';
import { addErrorAndSanitizedData } from './validationHelpers';

// const isEmpty = (value) =>
//   value === undefined ||
//   value === null ||
//   (typeof value === 'object' && Object.keys(value).length === 0) ||
//   (typeof value === 'string' && value.trim().length === 0);

const validateAndSanitizeOrder = (data) => {
  // Turn all empty inputs into empty strings
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.address1 = !isEmpty(data.address1) ? data.address1 : '';
  data.address2 = !isEmpty(data.address2) ? data.address2 : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  //   data.state = !isEmpty(data.state) ? data.state : '';
  data.postcode = !isEmpty(data.postcode) ? data.postcode : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  //   data.createAccount = !isEmpty(data.createAccount) ? data.createAccount : '';
  data.orderNotes = !isEmpty(data.orderNotes) ? data.orderNotes : '';
  // data.paymentMethod = !isEmpty(data.paymentMethod) ? data.paymentMethod : '';

  const fields = [
    {
      fieldName: 'firstName',
      errorContent: 'First name',
      min: 1,
      max: 135,
      type: 'string',
      required: true,
    },
    {
      fieldName: 'lastName',
      errorContent: 'Last name',
      min: 1,
      max: 135,
      type: 'string',
      required: true,
    },
    {
      fieldName: 'address1',
      errorContent: 'Street address line 1',
      min: 1,
      max: 254,
      type: 'string',
      required: true,
    },
    {
      fieldName: 'address2',
      errorContent: '',
      min: 0,
      max: 254,
      type: 'string',
      required: false,
    },
    {
      fieldName: 'city',
      errorContent: 'City',
      min: 2,
      max: 135,
      type: 'string',
      required: true,
    },
    {
      fieldName: 'postcode',
      errorContent: 'Post code',
      min: 2,
      max: 9,
      type: 'postcode',
      required: true,
    },
    {
      fieldName: 'country',
      errorContent: 'Country',
      min: 2,
      max: 155,
      type: 'string',
      required: true,
    },
    { fieldName: 'email', errorContent: 'Email', min: 6, max: 254, type: 'email', required: true },
    {
      fieldName: 'phone',
      errorContent: 'Phone number',
      min: 5,
      max: 18,
      type: 'phone',
      required: false,
    },
    {
      fieldName: 'orderNotes',
      errorContent: 'Notes',
      min: 0,
      max: 1500,
      type: 'string',
      required: false,
    },
  ];

  const { errors, sanitizedData } = addErrorAndSanitizedData(fields, data);

  //   addErrorAndSanitizedData( 'state', 'State/County', 0, 254, 'string', true );

  // The data.createAccount is a boolean value.
  //   sanitizedData.createAccount = data.createAccount;
  // addErrorAndSanitizedData('paymentMethod', 'Payment method', 2, 20, 'string', true);

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAndSanitizeOrder;

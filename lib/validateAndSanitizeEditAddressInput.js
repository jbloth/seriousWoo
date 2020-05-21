import { isEmpty } from './functions';
import { addErrorAndSanitizedData } from './validationHelpers';

// If isShipping is true, email and phone fields will not be part of the result
const validateAndSanitizeEditAddressInput = (data, isShipping = false) => {
  // Turn all empty inputs into empty strings
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.address1 = !isEmpty(data.address1) ? data.address1 : '';
  data.address2 = !isEmpty(data.address2) ? data.address2 : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.postcode = !isEmpty(data.postcode) ? data.postcode : '';

  if (!isShipping) {
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.email = !isEmpty(data.email) ? data.email : '';
  }

  let fields = [
    {
      fieldName: 'firstName',
      errorContent: 'First name',
      min: 1,
      max: 135,
      type: 'string',
      required: false,
    },
    {
      fieldName: 'lastName',
      errorContent: 'Last name',
      min: 1,
      max: 135,
      type: 'string',
      required: false,
    },
    {
      fieldName: 'address1',
      errorContent: 'Street address line 1',
      min: 1,
      max: 254,
      type: 'string',
      required: false,
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
      required: false,
    },
    {
      fieldName: 'postcode',
      errorContent: 'Post code',
      min: 2,
      max: 9,
      type: 'postcode',
      required: false,
    },
    {
      fieldName: 'country',
      errorContent: 'Country',
      min: 2,
      max: 155,
      type: 'string',
      required: false,
    },
  ];

  if (!isShipping) {
    fields.push({
      fieldName: 'email',
      errorContent: 'Email',
      min: 6,
      max: 254,
      type: 'email',
      required: false,
    });
    fields.push({
      fieldName: 'phone',
      errorContent: 'Phone number',
      min: 5,
      max: 18,
      type: 'phone',
      required: false,
    });
  }

  const { errors, sanitizedData } = addErrorAndSanitizedData(fields, data);

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAndSanitizeEditAddressInput;

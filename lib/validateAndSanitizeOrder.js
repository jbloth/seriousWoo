import validator from 'validator';

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

const validateAndSanitizeOrder = (data) => {
  let errors = {};
  let sanitizedData = {};

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

  const addErrorAndSanitizedData = (fieldName, errorContent, min, max, type = '', required) => {
    //   const postCodeLocale = config.postCodeLocale ? config.postCodeLocale : '';

    if (!validator.isLength(data[fieldName], { min, max })) {
      errors[fieldName] = `${errorContent} must be ${min} to ${max} characters.`;
    }

    if ('email' === type && !validator.isEmail(data[fieldName])) {
      errors[fieldName] = `${errorContent} is not valid.`;
    }

    if ('phone' === type && !validator.isMobilePhone(data[fieldName])) {
      errors[fieldName] = `${errorContent} is not valid.`;
    }

    // TODO: Get post code locale from selected country?
    if ('postcode' === type && !validator.isPostalCode(data[fieldName], 'any')) {
      errors[fieldName] = `${errorContent} is not valid.`;
    }

    if (required && validator.isEmpty(data[fieldName])) {
      errors[fieldName] = `${errorContent} is required.`;
    }

    // If no errors
    if (!errors[fieldName]) {
      sanitizedData[fieldName] = validator.trim(data[fieldName]);
      sanitizedData[fieldName] =
        'email' === type
          ? validator.normalizeEmail(sanitizedData[fieldName])
          : sanitizedData[fieldName];
      sanitizedData[fieldName] = validator.escape(sanitizedData[fieldName]);
    }
  };

  // Do tha validate and tha sanitize
  addErrorAndSanitizedData('firstName', 'First name', 1, 135, 'string', true);
  addErrorAndSanitizedData('lastName', 'Last name', 1, 135, 'string', true);
  addErrorAndSanitizedData('country', 'Country name', 2, 155, 'string', true);
  addErrorAndSanitizedData('address1', 'Street address line 1', 1, 100, 'string', true);
  addErrorAndSanitizedData('address2', '', 0, 254, 'string', false);
  addErrorAndSanitizedData('city', 'City field', 2, 25, 'string', true);
  //   addErrorAndSanitizedData( 'state', 'State/County', 0, 254, 'string', true );
  addErrorAndSanitizedData('postcode', 'Post code', 2, 9, 'postcode', true);
  addErrorAndSanitizedData('phone', 'Phone number', 5, 18, 'phone', false);
  addErrorAndSanitizedData('email', 'Email', 6, 254, 'email', true);

  // The data.createAccount is a boolean value.
  //   sanitizedData.createAccount = data.createAccount;
  addErrorAndSanitizedData('orderNotes', '', 0, 254, 'string', false);
  // addErrorAndSanitizedData('paymentMethod', 'Payment method', 2, 20, 'string', true);

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAndSanitizeOrder;

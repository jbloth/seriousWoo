import validator from 'validator';
import { isEmpty } from './functions';

const validateAndSanitizeLoginInput = (data) => {
  let errors = {};
  let sanitizedData = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  const addErrorAndSanitizedData = (fieldName, errorContent, min, max, type = '', required) => {
    if (!validator.isLength(data[fieldName], { min, max })) {
      errors[fieldName] = `${errorContent} must be ${min} to ${max} characters.`;
    }

    if ('email' === type && !validator.isEmail(data[fieldName])) {
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

  addErrorAndSanitizedData('email', 'Email', 1, 120, 'text', true);
  addErrorAndSanitizedData('password', 'Password', 4, 256, 'password', true);

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAndSanitizeLoginInput;

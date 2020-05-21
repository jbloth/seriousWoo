import validator from 'validator';
import { isEmpty } from './functions';

export const addErrorAndSanitizedData = (fields, data) => {
  let errors = {};
  let sanitizedData = {};

  fields.forEach(({ fieldName, errorContent, min, max, type, required }) => {
    if (!type) {
      type = '';
    }

    // If the field is not required and empty, just sanitize
    const emptyAndUnrequired = !required && validator.isEmpty(data[fieldName]);

    if (!emptyAndUnrequired) {
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
  });

  return { errors, sanitizedData };
};

import validator from 'validator';

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

const validateAndSanitizeContactFormInput = (data) => {
  let errors = {};
  let sanitizedData = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.content = !isEmpty(data.content) ? data.content : '';

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

  addErrorAndSanitizedData('name', 'Name', 2, 99, 'name', true);
  addErrorAndSanitizedData('email', 'Email', 6, 254, 'email', true);
  addErrorAndSanitizedData('content', 'Content', 3, 8000, 'content', true);

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAndSanitizeContactFormInput;

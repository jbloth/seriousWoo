import { isEmpty } from './functions';
import { addErrorAndSanitizedData } from './validationHelpers';

const validateAndSanitizeLoginInput = (data) => {
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  const fields = [
    {
      fieldName: 'email',
      errorContent: 'Email',
      min: 1,
      max: 120,
      type: 'text',
      required: true,
    },
    {
      fieldName: 'password',
      errorContent: 'Password',
      min: 4,
      max: 256,
      type: 'password',
      required: true,
    },
  ];

  const { errors, sanitizedData } = addErrorAndSanitizedData(fields, data);

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAndSanitizeLoginInput;

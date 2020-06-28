import { isEmpty } from './functions';
import { addErrorAndSanitizedData } from './validationHelpers';

const validateAndSanitizeContactFormInput = (data) => {
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.message = !isEmpty(data.message) ? data.message : '';

  const fields = [
    {
      fieldName: 'name',
      errorContent: 'Name',
      min: 1,
      max: 99,
      type: 'name',
      required: true,
    },
    {
      fieldName: 'email',
      errorContent: 'Email',
      min: 6,
      max: 254,
      type: 'email',
      required: true,
    },
    {
      fieldName: 'message',
      errorContent: 'message',
      min: 3,
      max: 8000,
      type: 'message',
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

export default validateAndSanitizeContactFormInput;

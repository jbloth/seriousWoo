import { isEmpty } from './functions';
import { addErrorAndSanitizedData } from './validationHelpers';

const validateAndSanitizeEditUserInput = (data) => {
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  const fields = [
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
    { fieldName: 'email', errorContent: 'Email', min: 6, max: 254, type: 'email', required: false },
  ];

  const { errors, sanitizedData } = addErrorAndSanitizedData(fields, data);

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAndSanitizeEditUserInput;

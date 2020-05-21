import { isEmpty } from './functions';
import { addErrorAndSanitizedData } from './validationHelpers';

const validateAndSanitizeContactFormInput = (data) => {
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.content = !isEmpty(data.content) ? data.content : '';

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
      fieldName: 'content',
      errorContent: 'Content',
      min: 3,
      max: 8000,
      type: 'content',
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

import gql from 'graphql-tag';

const UPDATE_CUSTOMER = gql`
  mutation($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        id
        username
        firstName
        lastName
        email
      }
    }
  }
`;

export default UPDATE_CUSTOMER;

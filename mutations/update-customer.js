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
        billing {
          firstName
          lastName
          address1
          address2
          city
          postcode
          state
          country
          email
          phone
        }
        shipping {
          firstName
          lastName
          address1
          address2
          postcode
          city
          state
          country
          email
          phone
        }
      }
    }
  }
`;

export default UPDATE_CUSTOMER;

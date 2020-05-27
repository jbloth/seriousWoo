import gql from 'graphql-tag';

const GET_PAYMENT_METHODS = gql`
  query paymentMethods {
    paymentGateways {
      nodes {
        id
        title
        icon
        description
      }
    }
  }
`;

export default GET_PAYMENT_METHODS;

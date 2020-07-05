import gql from 'graphql-tag';

const EMPTY_CART = gql`
  mutation {
    emptyCart(input: { clientMutationId: "bla" }) {
      cart {
        isEmpty
        shippingTotal
        subtotal
        total
      }
    }
  }
`;

export default EMPTY_CART;

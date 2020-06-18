import gql from 'graphql-tag';

/**
 * This query is used for both updating the items in the cart and deleting a cart item.
 */
const UPDATE_CART = gql`
  mutation($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        key
        quantity
        total
        subtotal
      }
    }
  }
`;

export default UPDATE_CART;

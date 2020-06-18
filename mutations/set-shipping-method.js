import gql from 'graphql-tag';

/**
 * This query is used for both updating the items in the cart and deleting a cart item.
 */
const SET_SHIPPING_METHOD = gql`
  mutation($input: UpdateShippingMethodInput!) {
    updateShippingMethod(input: $input) {
      cart {
        availableShippingMethods {
          packageDetails
          supportsShippingCalculator
          rates {
            id
            cost
            label
          }
        }
        chosenShippingMethod
        total
      }
    }
  }
`;

export default SET_SHIPPING_METHOD;

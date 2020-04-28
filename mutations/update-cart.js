import gql from 'graphql-tag';

/**
 * This query is used for both updating the items in the cart and deleting a cart item.
 */
const UPDATE_CART = gql`
  mutation($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        key
        product {
          id
          productId
          name
          type
          onSale
          slug
          image {
            id
            sourceUrl
            altText
          }
        }
        variation {
          id
          variationId
          name
          type
          onSale
          price
          regularPrice
          salePrice
          image {
            id
            sourceUrl
            altText
          }
          attributes {
            nodes {
              id
              attributeId
              name
              value
            }
          }
        }
        quantity
        total
        subtotal
        subtotalTax
      }
      removed {
        key
        product {
          id
          productId
        }
        variation {
          id
          variationId
        }
      }
      updated {
        key
        product {
          id
          productId
        }
        variation {
          id
          variationId
        }
      }
    }
  }
`;

export default UPDATE_CART;

import gql from 'graphql-tag';

const GET_CART = gql`
  query GET_CART {
    cart {
      contents {
        nodes {
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
              title
            }
            ... on VariableProduct {
              id
              name
              price
            }
            ... on SimpleProduct {
              id
              name
              price(format: FORMATTED)
            }
            ... on ExternalProduct {
              id
              name
              price
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
            attributes {
              nodes {
                id
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
      }
      appliedCoupons {
        nodes {
          couponId
          discountType
          amount
          dateExpiry
          products {
            nodes {
              id
            }
          }
          productCategories {
            nodes {
              id
            }
          }
        }
      }
      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
      chosenShippingMethod
      availableShippingMethods {
        rates {
          cost
          id
          label
        }
        packageDetails
      }
    }
  }
`;

export default GET_CART;

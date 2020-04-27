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
    }
  }
`;

export default GET_CART;

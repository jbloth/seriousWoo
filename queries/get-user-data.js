import gql from 'graphql-tag';

const GET_USER_DATA = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      userId
      name
      firstName
      lastName
      username
      email
    }
    customer(id: $id) {
      customerId
      id
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
      orders {
        nodes {
          id
          orderId
          orderNumber
          orderKey
          paymentMethod
          paymentMethodTitle
          date
          currency
          needsPayment
          needsProcessing
          billing {
            firstName
            lastName
            address1
            address2
            city
            country
            postcode
            state
            email
            phone
          }
          customerNote
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
          shippingTotal
          status
          subtotal
          total
          lineItems {
            nodes {
              itemId
              quantity
              subtotal
              total
              variationId
              product {
                id
                name
                productId
                slug
                ... on VariableProduct {
                  id
                  name
                  price
                }
                ... on SimpleProduct {
                  id
                  name
                  price
                }
                ... on ExternalProduct {
                  id
                  name
                  price
                }
              }
              variation {
                id
                name
                attributes {
                  nodes {
                    attributeId
                    id
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_USER_DATA;

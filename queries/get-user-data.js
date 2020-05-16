import gql from 'graphql-tag';

const GET_USER_DATA = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      userId
      name
      firstName
      lastName
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
          lineItems {
            nodes {
              itemId
              productId
              quantity
              subtotal
              variation {
                name
                attributes {
                  nodes {
                    attributeId
                    id
                    name
                    value
                  }
                }
                id
                price
                variationId
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_USER_DATA;

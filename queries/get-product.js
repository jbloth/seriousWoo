import gql from 'graphql-tag';

const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      id
      name
      slug
      description
      productId
      type
      ... on VariableProduct {
        id
        price
        name
        variations {
          nodes {
            id
            variationId
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
      ... on SimpleProduct {
        id
        price
      }
      ... on ExternalProduct {
        id
        price
      }
      image {
        id
        sourceUrl
        title
        srcSet
        uri
      }
    }
  }
`;

export default GET_PRODUCT;

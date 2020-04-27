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
        sourceUrl
        title
        srcSet
        uri
      }
    }
  }
`;

export default GET_PRODUCT;

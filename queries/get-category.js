import gql from 'graphql-tag';

const GET_CATEGORY = gql`
  query ProductCategory($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      name
      products {
        nodes {
          id
          name
          productId
          type
          slug
          productTags {
            nodes {
              name
            }
          }
          image {
            sourceUrl
            title
          }
          ... on VariableProduct {
            id
            price
          }
          ... on ExternalProduct {
            id
            price
          }
          ... on SimpleProduct {
            id
            price
          }
        }
      }
    }
  }
`;

export default GET_CATEGORY;

import gql from 'graphql-tag';

const GET_CATEGORY_PAGINATION = gql`
  query ProductCategory($id: ID!, $first: Int, $after: String) {
    productCategory(id: $id, idType: SLUG) {
      name
      products(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          cursor
          node {
            id
            name
            productId
            type
            slug
            productTags {
              nodes {
                id
                name
              }
            }
            image {
              id
              sourceUrl(size: SHOP_SINGLE)
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
  }
`;

export default GET_CATEGORY_PAGINATION;

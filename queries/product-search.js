import gql from 'graphql-tag';

const PRODUCT_SEARCH_QUERY = gql`
  query ProductSearchQuery($searchQuery: String!) {
    products(where: { search: $searchQuery }) {
      nodes {
        id
        name
        productId
        slug
        image {
          id
          sourceUrl
        }
        productCategories {
          nodes {
            name
            slug
            id
          }
        }
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
    }
  }
`;

export default PRODUCT_SEARCH_QUERY;

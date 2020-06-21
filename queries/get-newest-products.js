import gql from 'graphql-tag';

const GET_NEWEST_PRODUCTS = gql`
  query newestProducts($number: Int) {
    products(first: $number) {
      nodes {
        id
        name
        productId
        slug
        image {
          id
          sourceUrl
        }
        ... on VariableProduct {
          id
          name
          price
        }
      }
    }
  }
`;

export default GET_NEWEST_PRODUCTS;

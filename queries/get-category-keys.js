import gql from 'graphql-tag';

const GET_CATEGORY_KEYS = gql`
  query {
    productCategories {
      nodes {
        name
        id
        slug
      }
    }
  }
`;

export default GET_CATEGORY_KEYS;

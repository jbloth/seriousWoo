import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        name
        email
        firstName
        lastName
        userId
        nicename
        nickname
        username
      }
    }
  }
`;

export default UPDATE_USER;

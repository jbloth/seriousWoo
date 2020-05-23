import gql from 'graphql-tag';

const DELETE_USER = gql`
  mutation($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      deletedId
    }
  }
`;

export default DELETE_USER;

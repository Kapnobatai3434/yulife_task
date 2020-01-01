import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation($name: String!, $username: String!, $password: String!) {
    createUser(
      createUser: { name: $name, username: $username, password: $password }
    ) {
      name
      username
      type
      token
      manager {
        id
        name
        type
      }
    }
  }
`;

import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      name
      username
      token
      type
    }
  }
`;

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

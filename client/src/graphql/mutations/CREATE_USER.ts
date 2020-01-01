import gql from 'graphql-tag';

export interface IRegistrationUserData {
  id: string;
  name: string;
  username: string;
  token: string;
  type: string;
}

export const CREATE_USER = gql`
  mutation($name: String!, $username: String!, $password: String!) {
    createUser(
      createUser: { name: $name, username: $username, password: $password }
    ) {
      id
      name
      username
      token
      type
    }
  }
`;

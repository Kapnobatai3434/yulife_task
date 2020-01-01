import gql from 'graphql-tag';

export interface ILoginUserData {
  id: string;
  name: string;
  username: string;
  token: string;
  type: string;
}

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

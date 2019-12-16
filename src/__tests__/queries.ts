import gql from 'graphql-tag';

export const FIND_BY_ID = gql`
  query($id: String!) {
    findOneById(id: $id) {
      name
      token
      id
      type
      manager {
        name
        id
      }
      subordinates {
        name
        id
      }
    }
  }
`;

export const FIND_ALL_USERS = gql`
  query {
    getUsers {
      type
      name
      id
      username
      manager {
        name
        id
      }
      subordinates {
        name
        id
      }
    }
  }
`;

export const WHO_AM_I = gql`
  query {
    whoAmI {
      name
      type
      id
    }
  }
`;

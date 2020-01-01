import gql from 'graphql-tag';

export const FIND_ALL_USERS = gql`
  query {
    getUsers {
      type
      name
      id
      username
      createdAt
      updatedAt
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

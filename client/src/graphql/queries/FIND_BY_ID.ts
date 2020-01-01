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

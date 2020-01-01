import gql from 'graphql-tag';

export const WHO_AM_I = gql`
  query {
    whoAmI {
      name
      type
      id
    }
  }
`;

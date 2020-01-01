import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { getToken } from '../helpers/localStorage';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getToken();

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

const error = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, error.concat(httpLink)),
});

export default client;

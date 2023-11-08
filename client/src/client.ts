import { ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * Apollo client for making GraphQL requests to the server.
 */
export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Review: {
        fields: {
          votes: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

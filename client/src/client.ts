import { ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * Apollo client for making GraphQL requests to the server.
 */
export const client = new ApolloClient({
  uri: import.meta.env.PROD ? 'http://it2810-44.idi.ntnu.no:3001/graphql' : 'http://localhost:3001/graphql',
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

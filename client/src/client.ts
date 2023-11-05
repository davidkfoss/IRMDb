import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  // TODO: use env variable to allow for different endpoints
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

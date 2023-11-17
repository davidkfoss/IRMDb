import { ApolloClient, InMemoryCache } from '@apollo/client';
import { config } from './config';

/**
 * Apollo client for making GraphQL requests to the server.
 */
export const client = new ApolloClient({
  uri: config.serverUrl,
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

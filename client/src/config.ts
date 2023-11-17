export const config = {
  /**
   * The base URL of the GraphQL server.
   */
  serverUrl: import.meta.env.PROD ? 'http://it2810-44.idi.ntnu.no:3001/graphql' : 'http://localhost:3001/graphql',
  /**
   * The base URL of the client.
   */
  baseUrl: import.meta.env.PROD ? '/project2' : '/',
};

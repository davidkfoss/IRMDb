import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import MovieSchema from './movie';
import ReviewSchema from './review';
import UserSchema from './user';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...MovieSchema.query,
    ...ReviewSchema.query,
    ...UserSchema.query,
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    ...ReviewSchema.mutation,
    ...UserSchema.mutation,
  },
});

/**
 * Array of type definitions for GraphQL schema.
 * @type {Array}
 */
const Types = [
  MovieSchema.typeDefs,
  ReviewSchema.typeDefs.Vote,
  ReviewSchema.typeDefs.ReviewMetaType,
  ReviewSchema.typeDefs.ReviewType,
  UserSchema.typeDefs,
];

export const schema = new GraphQLSchema({
  types: Types,
  query: RootQuery,
  mutation: RootMutation,
});

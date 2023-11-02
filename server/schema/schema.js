import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import MovieSchema from './movie.js';
import ReviewSchema from './review.js';
import UserSchema from './user.js';

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

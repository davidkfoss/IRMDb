const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const MovieSchema = require('./movie.js');
const ReviewSchema = require('./review.js');
const UserSchema = require('./user.js');

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

const Types = [MovieSchema.typeDefs, ReviewSchema.typeDefs, UserSchema.typeDefs];

const schema = new GraphQLSchema({
  types: Types,
  query: RootQuery,
  mutation: RootMutation,
});

exports.schema = schema;

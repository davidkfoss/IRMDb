const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');
const UserService = require('../services/UserService');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    profilePictureUrl: { type: GraphQLString },
  }),
});

const UserQuery = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      return UserService.getUserById(args.id);
    },
  },
};
const UserMutation = {
  addUser: {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      profilePictureUrl: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return UserService.createUser({ email: args.email, profilePictureUrl: args.profilePictureUrl });
    },
  },
};
exports.typeDefs = UserType;
exports.query = UserQuery;
exports.mutation = UserMutation;

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql');
const { UserService } = require('../services/UserService');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profilePictureUrl: { type: GraphQLString },
  }),
});

const UserQuery = {
  GetAllUsers: {
    type: new GraphQLList(UserType),
    resolve() {
      return UserService.getAllUsers();
    },
  },
  GetUserById: {
    type: UserType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      return UserService.getUserById(args.id);
    },
  },
  GetUserByEmail: {
    type: UserType,
    args: { email: { type: GraphQLNonNull(GraphQLString) } },
    resolve(parent, args) {
      return UserService.getUserByEmail(args.email);
    },
  },
};

const UserMutation = {
  CreateUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      profilePictureUrl: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return UserService.createUser({ name: args.name, email: args.email, profilePictureUrl: args.profilePictureUrl });
    },
  },
  UpdateUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      profilePictureUrl: { type: GraphQLString },
    },
    resolve(parent, args) {
      return UserService.updateUser(args.id, {
        name: args.name,
        email: args.email,
        profilePictureUrl: args.profilePictureUrl,
      });
    },
  },
};
exports.typeDefs = UserType;
exports.query = UserQuery;
exports.mutation = UserMutation;

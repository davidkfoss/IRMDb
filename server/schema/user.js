import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql';
import { userService } from '../services/UserService.js';

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
    async resolve() {
      return await userService.getAllUsers();
    },
  },
  GetUserById: {
    type: UserType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      return await userService.getUserById(args.id);
    },
  },
  GetUserByEmail: {
    type: UserType,
    args: { email: { type: GraphQLNonNull(GraphQLString) } },
    async resolve(parent, args) {
      return await userService.getUserByEmail(args.email);
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
    async resolve(parent, args) {
      return await userService.createUser({
        name: args.name,
        email: args.email,
        profilePictureUrl: args.profilePictureUrl,
      });
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
    async resolve(parent, args) {
      return await userService.updateUser(args.id, {
        name: args.name,
        email: args.email,
        profilePictureUrl: args.profilePictureUrl,
      });
    },
  },
};

export default { typeDefs: UserType, query: UserQuery, mutation: UserMutation };

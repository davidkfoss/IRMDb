import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql';
import { userService } from '../services/UserService';
import { User, UserData } from '../types/userTypes';

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
    async resolve(): Promise<User[]> {
      return (await userService.getAllUsers()).map((user) => user.toObject()) as User[];
    },
  },
  GetUserById: {
    type: UserType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    async resolve(parent: any, args: { id: string }) {
      return await userService.getUserById(args.id);
    },
  },
  GetUserByEmail: {
    type: UserType,
    args: { email: { type: GraphQLNonNull(GraphQLString) } },
    async resolve(parent: any, args: { email: string }) {
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
    async resolve(parent: any, args: UserData) {
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
    async resolve(parent: any, args: { id: string; name: string; email: string; profilePictureUrl: string }) {
      return await userService.updateUser(args.id, {
        name: args.name,
        email: args.email,
        profilePictureUrl: args.profilePictureUrl,
      });
    },
  },
};

export default { typeDefs: UserType, query: UserQuery, mutation: UserMutation };

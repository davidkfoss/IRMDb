import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { userService } from '../services/UserService';
import { User } from '../types/userTypes';
import bcrypt from 'bcrypt';
import { config } from '../config/config';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
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
  GetUserAuth: {
    type: UserType,
    args: { email: { type: GraphQLNonNull(GraphQLString) }, password: { type: GraphQLNonNull(GraphQLString) } },
    async resolve(parent: any, args: { email: string; password: string }) {
      const user = await userService.getUserByEmail(args.email);
      if (!user) {
        return null;
      }
      const isMatch = await bcrypt.compare(args.password, user.password);
      if (!isMatch) {
        return null;
      }
      return user;
    },
  },
};

const UserMutation = {
  CreateUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
      try {
        const hash = await bcrypt.hash(args.password, parseInt(config.SALT_ROUNDS)).then((hash: string) => hash);
        if (!hash) {
          return null;
        }
        const user = await userService.createUser({
          name: args.name,
          email: args.email,
          password: hash,
        });

        if (!user) {
          return null;
        }
        return user;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  },

  UpdateUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    async resolve(parent: any, args: { id: string; name: string; email: string }) {
      return await userService.updateUser(args.id, {
        name: args.name,
        email: args.email,
      });
    },
  },
};

export default { typeDefs: UserType, query: UserQuery, mutation: UserMutation };

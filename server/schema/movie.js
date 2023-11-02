import {
  GraphQLFloat,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';
import { movieService } from '../services/MovieService.js';

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLList(GraphQLString) },
    releaseDate: { type: GraphQLString },
    posterUrl: { type: GraphQLString },
    overview: { type: GraphQLString },
    popularity: { type: GraphQLFloat },
    rating: { type: GraphQLFloat },
    reviews: { type: GraphQLList(GraphQLString) },
  }),
});

const MovieQuery = {
  GetMovieById: {
    type: MovieType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      return movieService.getMovieById(args.id);
    },
  },
  // DEPRECATED
  GetAllMovies: {
    type: new GraphQLList(MovieType),
    resolve() {
      return movieService.getAllMovies(args.offset, args.limit);
    },
  },
  GetMoviesByFilter: {
    type: new GraphQLList(MovieType),
    args: {
      genre: { type: new GraphQLList(GraphQLString) },
      sortBy: { type: GraphQLString },
      direction: { type: GraphQLString },
      search: { type: GraphQLString },
      offset: { type: GraphQLInt },
      limit: { type: GraphQLInt },
    },
    async resolve(parent, args) {
      let movies = await movieService.getAllMovies(
        args.offset,
        args.limit,
        args.search,
        args.genre,
        args.sortBy,
        args.direction
      );
      return movies;
    },
  },
};

export default { typeDefs: MovieType, query: MovieQuery };

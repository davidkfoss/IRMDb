const {
  GraphQLFloat,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');
const { MovieService } = require('../services/MovieService');

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
      return MovieService.getMovieById(args.id);
    },
  },
  // DEPRECATED
  GetAllMovies: {
    type: new GraphQLList(MovieType),
    resolve() {
      return MovieService.getAllMovies(args.offset, args.limit);
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
      let movies = await MovieService.getAllMovies(
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
exports.typeDefs = MovieType;
exports.query = MovieQuery;

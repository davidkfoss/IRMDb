const { GraphQLFloat, GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql');
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
  GetAllMovies: {
    type: new GraphQLList(MovieType),
    resolve() {
      return MovieService.getAllMovies();
    },
  },
  GetMoviesByFilter: {
    type: new GraphQLList(MovieType),
    args: {
      genre: { type: new GraphQLList(GraphQLString) },
      sortBy: { type: GraphQLString },
      direction: { type: GraphQLString },
      search: { type: GraphQLString },
    },
    async resolve(parent, args) {
      let movies = await MovieService.getAllMovies();
      if (args.genre) {
        movies = movies.filter((movie) => args.genre.every((genre) => movie.genre.includes(genre)));
      }
      if (args.search) {
        movies = movies.filter((movie) => movie.title.toLowerCase().includes(args.search.toLowerCase()));
      }
      if (args.sortBy) {
        if (args.sortBy == 'Popularity') {
          movies.sort((a, b) => {
            if (args.direction == 'asc') {
              return a.popularity - b.popularity;
            } else {
              return b.popularity - a.popularity;
            }
          });
        } else if (args.sortBy == 'Release Date') {
          movies.sort((a, b) => {
            if (args.direction == 'asc') {
              return a.releaseDate.localeCompare(b.releaseDate);
            } else {
              return b.releaseDate.localeCompare(a.releaseDate);
            }
          });
        } else if (args.sortBy == 'Name') {
          movies.sort((a, b) => {
            if (args.direction == 'asc') {
              return a.title.localeCompare(b.title);
            } else {
              return b.title.localeCompare(a.title);
            }
          });
        } else if (args.sortBy == 'rating') {
          movies.sort((a, b) => {
            if (args.direction == 'asc') {
              return (a?.rating ?? -1) - (b?.rating ?? -1);
            } else {
              return (b?.rating ?? -1) - (a?.rating ?? -1);
            }
          });
        }
      }
      return movies;
    },
  },
};
exports.typeDefs = MovieType;
exports.query = MovieQuery;

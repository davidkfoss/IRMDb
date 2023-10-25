const { merge } = require('lodash');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

const { MovieService } = require('../services/MovieService');
const { ReviewService } = require('../services/ReviewService');
const { UserService } = require('../services/UserService');

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
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent) {
        return ReviewService.getReviewsByMovieId(parent.movieId);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    profilePictureUrl: { type: GraphQLString },
  }),
});

const ReviewMetaType = new GraphQLObjectType({
  name: 'ReviewMeta',
  fields: () => ({
    upvotes: { type: GraphQLInt },
    downvotes: { type: GraphQLInt },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    movieId: { type: GraphQLString },
    rating: { type: GraphQLInt },
    comment: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent) {
        return UserService.getUserById(parent.authorId);
      },
    },
    date: { type: GraphQLString },
    meta: {
      type: ReviewMetaType,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return MovieService.getMovieById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return MovieService.getAllMovies();
      },
    },
    moviesWithFilter: {
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
    reviews: {
      type: new GraphQLList(ReviewType),
      args: { movieId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return ReviewService.getReviewsByMovieId(args.id);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return UserService.getUserById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
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
    deleteReviewOnMovie: {
      type: GraphQLBoolean, // Indicate success or failure
      args: {
        movieId: { type: new GraphQLNonNull(GraphQLID) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const movie = await MovieService.getMovieById(args.movieId);
        const review = ReviewService.getReviewByAuthorAndMovieId(args.movieId, args.authorId);
        if (review) {
          console.log(movie.reviews);
          movie.reviews = movie.reviews.filter((id) => id != review.id);
          if (movie.reviews.length == 0) {
            movie.rating = 0;
          } else {
            movie.rating =
              movie.reviews.reduce((acc, id) => acc + ReviewService.getReviewsByMovieId(id).rating, 0) /
              movie.reviews.length;
          }
          ReviewService.deleteReview(review.id);
          return true;
        } else {
          return false;
        }
      },
    },
    addReviewOnMovie: {
      type: ReviewType,
      args: {
        movieId: { type: new GraphQLNonNull(GraphQLID) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        rating: { type: new GraphQLNonNull(GraphQLInt) },
        comment: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const newReview = {
          movieId: args.movieId,
          authorId: args.authorId,
          rating: args.rating,
          comment: args.comment,
        };
        ReviewService.createReview(newReview);
        const movie = MovieService.getMovieById(args.movieId);
        if (!movie.reviews) {
          movie.reviews = [];
          movie.rating = args.rating;
        } else {
          movie.rating = (movie.rating * movie.reviews.length + args.rating) / (movie.reviews.length + 1);
        }
        movie.reviews.push(newReview.id);
        return newReview;
      },
    },
  },
});
const { MovieQueries } = require('./MovieSchema');
exports.schema = new GraphQLSchema({ mutation: merge(Mutation), query: merge(RootQuery, MovieQueries) });

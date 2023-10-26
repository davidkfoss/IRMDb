const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require('graphql');

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    movieId: { type: GraphQLString },
    rating: { type: GraphQLInt },
    comment: { type: GraphQLString },
    author: {
      type: AuthorType,
    },
    date: { type: GraphQLString },
    meta: {
      type: ReviewMetaType,
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const ReviewMetaType = new GraphQLObjectType({
  name: 'ReviewMeta',
  fields: () => ({
    upvotes: { type: GraphQLInt },
    downvotes: { type: GraphQLInt },
  }),
});

const ReviewQuery = {
  reviews: {
    type: new GraphQLList(ReviewType),
    args: { movieId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      return ReviewService.getReviewsByMovieId(args.id);
    },
  },
};

const ReviewMutation = {
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
      const newReview = ReviewService.createReview({
        movieId: args.movieId,
        authorId: args.authorId,
        rating: args.rating,
        comment: args.comment,
      });
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
};
exports.typeDefs = ReviewType;
exports.query = ReviewQuery;
exports.mutation = ReviewMutation;

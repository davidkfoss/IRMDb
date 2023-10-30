const {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require('graphql');
const { ReviewService } = require('../services/ReviewService');
const { MovieService } = require('../services/MovieService');

//TypeDefs
const Vote = new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    vote: { type: GraphQLBoolean },
    user: { type: GraphQLString },
  }),
});

const ReviewMetaType = new GraphQLObjectType({
  name: 'ReviewMeta',
  fields: () => ({
    authorEmail: { type: GraphQLString },
    authorName: { type: GraphQLString },
    movieId: { type: GraphQLString },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    rating: { type: GraphQLInt },
    comment: { type: GraphQLString },
    votes: { type: new GraphQLList(Vote) },
    date: { type: GraphQLString },
    meta: {
      type: ReviewMetaType,
    },
  }),
});

//Queries
const ReviewQuery = {
  GetAllReviews: {
    type: new GraphQLList(ReviewType),
    async resolve(parent, args) {
      return await ReviewService.getAllReviews();
    },
  },
  GetReviewById: {
    type: ReviewType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      return await ReviewService.getReviewById(args.id);
    },
  },
  GetReviewsByMovieId: {
    type: new GraphQLList(ReviewType),
    args: { movieId: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      return await ReviewService.getReviewsByMovieId(args.movieId);
    },
  },
  GetReviewByAuthorAndMovieId: {
    type: ReviewType,
    args: {
      movieId: { type: new GraphQLNonNull(GraphQLID) },
      authorEmail: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return ReviewService.getReviewByAuthorAndMovieId(args.movieId, args.authorEmail);
    },
  },
};

const UpdateMovieRating = async (movieId) => {
  const reviews = await ReviewService.getReviewsByMovieId(movieId);
  await MovieService.updateMovieRating(movieId, reviews);
};

//Mutations
const ReviewMutation = {
  CreateReview: {
    type: ReviewType,
    args: {
      rating: { type: new GraphQLNonNull(GraphQLInt) },
      comment: { type: new GraphQLNonNull(GraphQLString) },
      authorEmail: { type: new GraphQLNonNull(GraphQLString) },
      movieId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const reviewData = {
        rating: args.rating,
        comment: args.comment,
        votes: [],
        meta: {
          authorEmail: args.authorEmail,
          movieId: args.movieId,
        },
      };
      const newReview = await ReviewService.createReview(reviewData);
      await UpdateMovieRating(args.movieId);
      return newReview;
    },
  },
  VoteReview: {
    type: ReviewType,
    args: {
      authorEmail: { type: new GraphQLNonNull(GraphQLString) },
      reviewId: { type: new GraphQLNonNull(GraphQLID) },
      vote: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    async resolve(parent, args) {
      return await ReviewService.voteReview(args.authorEmail, args.reviewId, args.vote);
    },
  },
  DeleteReview: {
    type: ReviewType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      const deletedReview = await ReviewService.deleteReview(args.id);
      await UpdateMovieRating(deletedReview.meta.movieId);
      return deletedReview;
    },
  },
};
exports.typeDefs = { ReviewType: ReviewType, Vote: Vote, ReviewMetaType: ReviewMetaType };
exports.query = ReviewQuery;
exports.mutation = ReviewMutation;

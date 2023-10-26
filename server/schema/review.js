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

//TypeDefs
const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    rating: { type: GraphQLInt },
    comment: { type: GraphQLString },
    votes: { type: new GraphQLList({ type: Vote }) },
    date: { type: GraphQLString },
    meta: {
      type: ReviewMetaType,
    },
  }),
});

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
    authorId: { type: GraphQLString },
    authorName: { type: GraphQLString },
    movieId: { type: GraphQLString },
  }),
});

//Queries
const ReviewQuery = {
  GetAllReviews: {
    type: new GraphQLList(ReviewType),
    resolve(parent, args) {
      return ReviewService.getAllReviews();
    },
  },
  GetReviewById: {
    type: ReviewType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      return ReviewService.getReviewById(args.id);
    },
  },
  GetReviewsByMovieId: {
    type: new GraphQLList(ReviewType),
    args: { movieId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      return ReviewService.getReviewsByMovieId(args.id);
    },
  },
  GetReviewByAuthorAndMovieId: {
    type: ReviewType,
    args: {
      movieId: { type: new GraphQLNonNull(GraphQLID) },
      authorId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return ReviewService.getReviewByAuthorAndMovieId(args.movieId, args.authorId);
    },
  },
};

//Mutations
const ReviewMutation = {
  CreateReview: {
    type: ReviewType,
    args: {
      rating: { type: new GraphQLNonNull(GraphQLInt) },
      comment: { type: new GraphQLNonNull(GraphQLString) },
      authorId: { type: new GraphQLNonNull(GraphQLID) },
      authorName: { type: new GraphQLNonNull(GraphQLString) },
      movieId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const reviewData = {
        rating: args.rating,
        comment: args.comment,
        votes: [],
        meta: {
          authorId: args.authorId,
          authorName: args.authorName,
          movieId: args.movieId,
        },
      };
      return ReviewService.createReview(reviewData);
    },
  },
  VoteReview: {
    type: ReviewType,
    args: {
      authorId: { type: new GraphQLNonNull(GraphQLID) },
      reviewId: { type: new GraphQLNonNull(GraphQLID) },
      vote: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    resolve(parent, args) {
      return ReviewService.voteReview(args.authorId, args.reviewId, args.vote);
    },
  },
  UpdateReview: {
    type: ReviewType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      review: { type: ReviewType },
    },
    resolve(parent, args) {
      return ReviewService.updateReview(args.id, review);
    },
  },
  DeleteReview: {
    type: ReviewType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
      return ReviewService.deleteReview(args.id);
    },
  },
};
exports.typeDefs = ReviewType;
exports.query = ReviewQuery;
exports.mutation = ReviewMutation;

import {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';
import { reviewService } from '../services/ReviewService.js';
import { movieService } from '../services/MovieService.js';

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
    movieTitle: { type: GraphQLString },
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
      return await reviewService.getAllReviews();
    },
  },
  GetReviewById: {
    type: ReviewType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      return await reviewService.getReviewById(args.id);
    },
  },
  GetReviewsByMovieId: {
    type: new GraphQLList(ReviewType),
    args: { movieId: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      return await reviewService.getReviewsByMovieId(args.movieId);
    },
  },
  GetReviewByAuthorAndMovieId: {
    type: ReviewType,
    args: {
      movieId: { type: new GraphQLNonNull(GraphQLID) },
      authorEmail: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      return reviewService.getReviewByAuthorAndMovieId(args.movieId, args.authorEmail);
    },
  },
  GetRecentReviews: {
    type: new GraphQLList(ReviewType),
    args: { limit: { type: GraphQLInt } },
    async resolve(parent, args) {
      return await reviewService.getRecentReviews(args.limit);
    },
  },
  GetPopularReviews: {
    type: new GraphQLList(ReviewType),
    args: { limit: { type: GraphQLInt } },
    async resolve(parent, args) {
      return await reviewService.getPopularReviews(args.limit);
    },
  },
};

const UpdateMovieRating = async (movieId) => {
  const reviews = await reviewService.getReviewsByMovieId(movieId);
  await movieService.updateMovieRating(movieId, reviews);
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
      const newReview = await reviewService.createReview(reviewData);
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
      return await reviewService.voteReview(args.authorEmail, args.reviewId, args.vote);
    },
  },
  DeleteVoteReview: {
    type: ReviewType,
    args: {
      authorEmail: { type: new GraphQLNonNull(GraphQLString) },
      reviewId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      return await reviewService.deleteVoteReview(args.authorEmail, args.reviewId);
    },
  },
  DeleteReview: {
    type: ReviewType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent, args) {
      const deletedReview = await reviewService.deleteReview(args.id);
      await UpdateMovieRating(deletedReview.meta.movieId);
      return deletedReview;
    },
  },
};

export default { typeDefs: ReviewType, query: ReviewQuery, mutation: ReviewMutation };

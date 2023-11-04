import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../App';
import { Review } from '../../../models/review';
import {
  createReviewMutation,
  deleteReviewMutation,
  deleteVoteReviewMutation,
  getPopularReviewsQuery,
  getRecentReviewsQuery,
  getReviewsByMovieIdQuery,
  voteReviewMutation,
} from '../../../queries/reviewQueries';

export const getReviewsOnMovie = createAsyncThunk<Review[] | undefined, { id: string; refetch: boolean }, object>(
  'reviews/getReviewsOnMovie',
  async ({ id, refetch }) => {
    const reviews = await client
      .query({
        query: getReviewsByMovieIdQuery,
        fetchPolicy: refetch ? 'no-cache' : undefined,
        variables: { movieId: id },
      })
      .then((result) => {
        return result.data.GetReviewsByMovieId;
      });
    return reviews;
  }
);

type ReviewInput = {
  authorEmail: string;
  movieId: string;
  comment: string;
  rating: number;
};

export const addReviewOnMovie = createAsyncThunk<Review | undefined, ReviewInput, object>(
  'reviews/addReviewOnMovie',
  async ({ comment, rating, movieId, authorEmail }) => {
    const addedReview = await client
      .mutate({
        mutation: createReviewMutation,
        variables: {
          rating: rating,
          comment: comment,
          authorEmail: authorEmail,
          movieId: movieId,
        },
      })
      .then((result) => {
        return result.data.CreateReview;
      });

    return addedReview;
  }
);

export const addVoteOnReview = createAsyncThunk<
  boolean,
  { authorEmail: string; reviewId: string; vote: boolean },
  object
>('reviews/addVoteOnReview', async ({ reviewId, vote, authorEmail }) => {
  const addedVote = await client
    .mutate({
      mutation: voteReviewMutation,
      variables: {
        reviewId: reviewId,
        vote: vote,
        authorEmail: authorEmail,
      },
    })
    .then((result) => {
      return result.data.VoteReview;
    });

  return addedVote;
});

export const deleteVoteOnReview = createAsyncThunk<boolean, { reviewId: string; authorEmail: string }, object>(
  'reviews/deleteVoteOnReview',
  async ({ reviewId, authorEmail }) => {
    const deletedVote = await client
      .mutate({
        mutation: deleteVoteReviewMutation,
        variables: {
          reviewId: reviewId,
          authorEmail: authorEmail,
        },
      })
      .then((result) => {
        return result.data.VoteReview;
      });

    return deletedVote;
  }
);

//TODO: I dont think we need movieId as param.
export const deleteReviewOnMovie = createAsyncThunk<boolean, { movieId: string; id: string }, object>(
  'reviews/deleteReviewOnMovie',
  async ({ id }) => {
    const deleted = await client
      .mutate({
        mutation: deleteReviewMutation,
        variables: {
          id,
        },
        update: (cache, { data }) => {
          cache.evict({ id: cache.identify(data.DeleteReview) });
        },
      })
      .then((result) => {
        return result.data.DeleteReview;
      })
      .catch((err) => {
        console.log(err);
      });

    return deleted;
  }
);

export const getRecentReviews = createAsyncThunk<Review[] | undefined, { limit: number }, object>(
  'reviews/getRecentReviews',
  async ({ limit }) => {
    const reviews = await client
      .query({
        query: getRecentReviewsQuery,
        variables: { limit: limit },
        fetchPolicy: 'no-cache',
      })
      .then((result) => {
        return result.data.GetRecentReviews;
      });
    return reviews;
  }
);

export const getPopularReviews = createAsyncThunk<Review[] | undefined, { limit: number }, object>(
  'reviews/getPopularReviews',
  async ({ limit }) => {
    const reviews = await client
      .query({
        query: getPopularReviewsQuery,
        variables: { limit: limit },
        fetchPolicy: 'no-cache',
      })
      .then((result) => {
        return result.data.GetPopularReviews;
      });

    return reviews;
  }
);

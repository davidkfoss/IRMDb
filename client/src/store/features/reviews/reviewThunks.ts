import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../client';
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

/**
 * Retrieves reviews for a movie with the given ID.
 * @param id - The ID of the movie to retrieve reviews for.
 * @param refetch - Whether to bypass the cache and fetch the data from the server.
 * @returns A promise that resolves to an array of reviews for the movie, or undefined if there was an error.
 */
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

/**
 * Adds a review for a movie.
 * @param comment - The comment for the review.
 * @param rating - The rating for the movie.
 * @param movieId - The ID of the movie being reviewed.
 * @param authorEmail - The email of the author of the review.
 * @returns A promise that resolves to the added review, or undefined if the review could not be added.
 */
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

/**
 * Adds a vote on a review.
 * @param authorEmail The email of the author who is voting.
 * @param reviewId The ID of the review to vote on.
 * @param vote The vote to add (true for upvote, false for downvote).
 * @returns A boolean indicating whether the vote was successfully added.
 */
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

/**
 * Deletes a vote on a review.
 * @param reviewId - The ID of the review to delete the vote from.
 * @param authorEmail - The email of the author who cast the vote.
 * @returns A boolean indicating whether the vote was successfully deleted.
 */
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

/**
 * Deletes a review on a movie with the given ID.
 * @param movieId - The ID of the movie the review belongs to.
 * @param id- The ID of the review to delete.
 * @returns {Promise<boolean>} A Promise that resolves to true if the review was successfully deleted, or false otherwise.
 */
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

/**
 * Fetches the most recent reviews from the server.
 * @param limit - The maximum number of reviews to fetch.
 * @returns A promise that resolves to an array of Review objects, or undefined if the request fails.
 */
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

/**
 * Fetches popular reviews from the server.
 * @param limit - The maximum number of reviews to fetch.
 * @returns A promise that resolves to an array of Review objects, or undefined if the request fails.
 */
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

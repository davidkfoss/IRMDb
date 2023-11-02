import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../App';
import { Review } from '../../../models/review';
import {
  createReviewMutation,
  deleteReviewMutation,
  getReviewsByMovieIdQuery,
  getRecentReviewsQuery,
  getPopularReviewsQuery,
} from '../../../queries/reviewQueries';

export const getReviewsOnMovie = createAsyncThunk<Review[] | undefined, string, object>(
  'reviews/getReviewsOnMovie',
  async (id) => {
    const reviews = await client
      .query({
        query: getReviewsByMovieIdQuery,
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

export const deleteReviewOnMovie = createAsyncThunk<boolean, { authorEmail: string; movieId: string }, object>(
  'reviews/deleteReviewOnMovie',
  async ({ authorEmail, movieId }) => {
    const deleted = await client
      .mutate({
        mutation: deleteReviewMutation,
        variables: {
          movieId: movieId,
          authorEmail: authorEmail,
        },
      })
      .then((result) => {
        return result.data.DeleteReview;
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
      })
      .then((result) => {
        return result.data.GetPopularReviews;
      });
    return reviews;
  }
);

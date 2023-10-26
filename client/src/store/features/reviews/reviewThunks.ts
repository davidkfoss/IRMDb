import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../App';
import { createReviewMutation, deleteReviewMutation, getReviewsByMovieIdQuery } from '../../../queries/reviewQueries';
import { Review } from './reviewsSlice';

export const getReviewsOnMovie = createAsyncThunk<Review[] | undefined, number, object>(
  'reviews/getReviewsOnMovie',
  async (id) => {
    console.log(`Fetching reviews on movie with id ${id}`);

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
  review: Review;
};

export const addReviewOnMovie = createAsyncThunk<Review | undefined, ReviewInput, object>(
  'reviews/addReviewOnMovie',
  async ({ review, movieId, authorEmail }) => {
    console.log(`Adding review on movie with id ${movieId}`);
    const addedReview = await client
      .mutate({
        mutation: createReviewMutation,
        variables: {
          movieId: movieId,
          rating: review.rating,
          comment: review.comment,
          authorEmail: authorEmail,
        },
      })
      .then((result) => {
        return result.data.CreateReview;
      });
    return addedReview;
  }
);

export const deleteReviewOnMovie = createAsyncThunk<boolean, { authorEmail: number; movieId: number }, object>(
  'reviews/deleteReviewOnMovie',
  async ({ authorEmail, movieId }) => {
    console.log(`Deleting review on movie with id ${movieId} by author with id ${authorEmail}`);

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

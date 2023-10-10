import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from './reviewsSlice';

export const getReviewsOnMovie = createAsyncThunk<Review[] | undefined, number, object>(
  'reviews/getReviewsOnMovie',
  async (id) => {
    console.log(`Fetching reviews on movie with id ${id}`);

    // TODO: Fetch reviews from API
    return undefined;
  }
);

type ReviewInput = {
  authorId: number;
  movieId: number;
  review: Review;
};

export const addReviewOnMovie = createAsyncThunk<Review | undefined, ReviewInput, object>(
  'reviews/addReviewOnMovie',
  async ({ review, movieId }) => {
    console.log(`Adding review on movie with id ${movieId}`);

    // TODO: Add review and return it
    return review;
  }
);

export const deleteReviewOnMovie = createAsyncThunk<boolean, { authorId: number; movieId: number }, object>(
  'reviews/deleteReviewOnMovie',
  async ({ authorId, movieId }) => {
    console.log(`Deleting review on movie with id ${movieId} by author with id ${authorId}`);

    // TODO: Fetch reviews from API
    return true;
  }
);

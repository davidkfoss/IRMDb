import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from './reviewsSlice';
import { client } from '../../../App';
import { addReviewOnMovieQuery, deleteReviewOnMovieQuery, getReviewsOnMovieQuery } from '../../../queries/queries';

export const getReviewsOnMovie = createAsyncThunk<Review[] | undefined, number, object>(
  'reviews/getReviewsOnMovie',
  async (id) => {
    console.log(`Fetching reviews on movie with id ${id}`);

    const reviews = await client.query({
      query: getReviewsOnMovieQuery,
      variables: {movieId: id},
    }).then((result) => {return result.data.reviews})
    return reviews;
  }
);

type ReviewInput = {
  authorId: number;
  movieId: number;
  review: Review;
};

export const addReviewOnMovie = createAsyncThunk<Review | undefined, ReviewInput, object>(
  'reviews/addReviewOnMovie',
  async ({ review, movieId, authorId}) => {
    console.log(`Adding review on movie with id ${movieId}`);
    const addedReview = await client.mutate({
      mutation: addReviewOnMovieQuery,
      variables: {
        movieId: movieId,
        rating: review.rating,
        comment: review.comment,
        authorId: authorId,
      }}).then((result) => {return result.data.addReviewOnMovie})
    return addedReview;
  }
);

export const deleteReviewOnMovie = createAsyncThunk<boolean, { authorId: number; movieId: number }, object>(
  'reviews/deleteReviewOnMovie',
  async ({ authorId, movieId }) => {
    console.log(`Deleting review on movie with id ${movieId} by author with id ${authorId}`);

    const deleted = await client.mutate({
      mutation: deleteReviewOnMovieQuery,
      variables: {
        movieId: movieId,
        authorId: authorId,
      }}).then((result) => {return result.data.deleteReviewOnMovie});
      
    return deleted;
  }
);

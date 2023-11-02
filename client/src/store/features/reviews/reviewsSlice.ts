import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Review } from '../../../models/review';
import { RootState } from '../../store';
import { addReviewOnMovie, deleteReviewOnMovie, getReviewsOnMovie } from './reviewThunks';

interface ReviewsState {
  [movieId: string]: Review[];
}

const initialReviewsState: ReviewsState = {
  reviews: [],
};

export const moviesSlice = createSlice({
  name: 'reviews',
  initialState: initialReviewsState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addReviewOnMovie.fulfilled, (state, action) => {
        if (action.payload) {
          const review = action.payload;
          const { movieId } = action.meta.arg;
          if (state[movieId]) {
            state[movieId].push(review);
          } else {
            state[movieId] = [review];
          }
        }
      })
      .addCase(deleteReviewOnMovie.fulfilled, (state, action) => {
        if (action.payload) {
          const { movieId, authorEmail } = action.meta.arg;
          const reviews = state[movieId];
          const reviewIndex = reviews.findIndex((review) => review.meta.authorEmail === authorEmail);
          if (reviewIndex !== -1) {
            reviews.splice(reviewIndex, 1);
          }
        }
      })
      .addCase(getReviewsOnMovie.fulfilled, (state, action) => {
        const movieId = action.meta.arg;
        state[movieId] = action.payload || [];
      }),
});

export const reviewsReducer = moviesSlice.reducer;

export const selectReviews = (state: RootState) => state.reviews;

export const selectReviewInfoOnMovie = (movieId: string) =>
  createSelector(selectReviews, (reviews) => reviews[movieId] || []);

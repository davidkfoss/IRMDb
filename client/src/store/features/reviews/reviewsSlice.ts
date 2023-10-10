import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { addReviewOnMovie, deleteReviewOnMovie } from './reviewThunks';

export interface Review {
  rating: number;
  comment: string;
}

export interface ReviewInfo {
  reviews: {
    [authorId: number]: Review;
  };
  reviewsCount: number;
  ratingAverage: number;
}

export interface Reviews {
  [movieId: number]: ReviewInfo;
}

interface ReviewsState {
  reviews: Reviews;
}

const initialReviewsState: ReviewsState = {
  reviews: {},
};

export const moviesSlice = createSlice({
  name: 'reviews',
  initialState: initialReviewsState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addReviewOnMovie.fulfilled, (state, action) => {
        if (action.payload) {
          const { authorId, movieId, review } = action.meta.arg;

          const reviewCount = state.reviews[movieId]?.reviewsCount ?? 0;
          const averageRating = state.reviews[movieId]?.ratingAverage ?? review.rating;

          state.reviews[movieId] = {
            reviews: {
              ...state.reviews[movieId]?.reviews,
              [authorId]: review,
            },
            reviewsCount: reviewCount + 1,
            ratingAverage: (averageRating * reviewCount + review.rating) / (reviewCount + 1),
          };
        }
      })
      .addCase(deleteReviewOnMovie.fulfilled, (state, action) => {
        if (action.payload) {
          const { authorId, movieId } = action.meta.arg;

          if (!state.reviews[movieId] || !state.reviews[movieId].reviews) return;

          const reviewCount = state.reviews[movieId].reviewsCount;
          const averageRating = state.reviews[movieId].ratingAverage;

          const review = state.reviews[movieId].reviews[authorId];
          delete state.reviews[movieId].reviews[authorId];

          state.reviews[movieId].reviewsCount = reviewCount - 1;
          state.reviews[movieId].ratingAverage = (averageRating * reviewCount - review.rating) / (reviewCount - 1);
        }
      }),
});

export const reviewsReducer = moviesSlice.reducer;

export const selectReviews = (state: RootState) => state.reviews.reviews;

export const selectReviewInfoOnMovie = (movieId: number) =>
  createSelector(selectReviews, (reviews) => reviews[movieId]);

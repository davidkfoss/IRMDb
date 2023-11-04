import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Review } from '../../../models/review';
import { RootState } from '../../store';
import {
  addReviewOnMovie,
  deleteReviewOnMovie,
  getPopularReviews,
  getRecentReviews,
  getReviewsOnMovie,
} from './reviewThunks';
interface LoadingState {
  pending: boolean;
  rejected: boolean;
  resolved: boolean;
}

const initialLoadingState: LoadingState = {
  pending: true,
  rejected: false,
  resolved: false,
};

interface loadingStates {
  recentReviews: LoadingState;
  popularReviews: LoadingState;
}

const initialLoadingStates: loadingStates = {
  recentReviews: initialLoadingState,
  popularReviews: initialLoadingState,
};
interface movieReviews {
  [movieId: string]: Review[];
}

interface ReviewsState {
  movieReviews: movieReviews;
  recentReviews: Review[];
  popularReviews: Review[];
  loadingStates: loadingStates;
}

const initialReviewsState: ReviewsState = {
  movieReviews: {},
  recentReviews: [],
  popularReviews: [],
  loadingStates: initialLoadingStates,
};

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState: initialReviewsState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addReviewOnMovie.fulfilled, (state, action) => {
        if (action.payload) {
          const review = action.payload;
          const { movieId } = action.meta.arg;
          if (state.movieReviews[movieId]) {
            state.movieReviews[movieId].push(review);
          } else {
            state.movieReviews[movieId] = [review];
          }
        }
      })
      .addCase(deleteReviewOnMovie.fulfilled, (state, action) => {
        if (action.payload) {
          const { movieId, id } = action.meta.arg;
          const reviews = state.movieReviews[movieId];
          if (!reviews) return;
          const reviewIndex = reviews.findIndex((review) => review.id === id);
          if (reviewIndex !== -1) {
            reviews.splice(reviewIndex, 1);
          }
        }
      })
      .addCase(getReviewsOnMovie.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        state.movieReviews[id] = action.payload || [];
      })
      .addCase(getRecentReviews.fulfilled, (state, action) => {
        state.loadingStates.recentReviews = { pending: false, rejected: false, resolved: true };
        if (action.payload) {
          const fetchedReviews = action.payload;
          state.recentReviews = fetchedReviews;
        }
      })
      .addCase(getRecentReviews.pending, (state) => {
        state.loadingStates.recentReviews = { pending: true, rejected: false, resolved: false };
      })
      .addCase(getRecentReviews.rejected, (state) => {
        state.loadingStates.recentReviews = { pending: false, rejected: true, resolved: false };
      })
      .addCase(getPopularReviews.fulfilled, (state, action) => {
        state.loadingStates.popularReviews = { pending: false, rejected: false, resolved: true };
        if (action.payload) {
          const fetchedReviews = action.payload;
          state.popularReviews = fetchedReviews;
        }
      })
      .addCase(getPopularReviews.pending, (state) => {
        state.loadingStates.popularReviews = { pending: true, rejected: false, resolved: false };
      })
      .addCase(getPopularReviews.rejected, (state) => {
        state.loadingStates.popularReviews = { pending: false, rejected: true, resolved: false };
      }),
});

export const reviewsReducer = reviewSlice.reducer;

export const selectReviews = (state: RootState) => state.reviews;

export const selectReviewInfoOnMovie = (movieId: string) =>
  createSelector(selectReviews, (reviews) => reviews.movieReviews[movieId] || []);

export const selectRecentReviews = () => createSelector(selectReviews, (reviews) => reviews.recentReviews);

export const selectPopularReviews = () => createSelector(selectReviews, (reviews) => reviews.popularReviews);

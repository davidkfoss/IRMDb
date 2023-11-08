import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { moviesReducer } from './features/movies/moviesSlice';
import { reviewsReducer } from './features/reviews/reviewsSlice';
import { userReducer } from './features/user/userSlice';

/**
 * Redux store configuration.
 */
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    reviews: reviewsReducer,
    user: userReducer,
  },
});

/**
 * The root state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * The type of the dispatch function from the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Returns a typed dispatch function for the Redux store.
 * @returns The typed dispatch function.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

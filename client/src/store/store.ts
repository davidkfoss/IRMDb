import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { moviesReducer } from './features/movies/moviesSlice';
import { reviewsReducer } from './features/reviews/reviewsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

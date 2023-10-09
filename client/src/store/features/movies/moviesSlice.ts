import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../../../models/movie';
import { RootState } from '../../store';
import { getMovieById } from './movieThunks';

interface MoviesState {
  movies: Movie[];
}

const initialMoviesState: MoviesState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialMoviesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieById.fulfilled, (state, action) => {
      if (action.payload) {
        state.movies.push(action.payload);
      }
    });
  },
});

export const moviesReducer = moviesSlice.reducer;

export const selectMovies = (state: RootState) => state.movies;

export const selectMovieById = (id: number) =>
  createSelector(selectMovies, (movies) => movies.movies.find((movie) => movie.id === id));

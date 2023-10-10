import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../../../models/movie';
import { RootState } from '../../store';
import { getMovieById, getMovies } from './movieThunks';

interface MoviesState {
  movies: Movie[];
  moviesFetched: number;
  pageSize: number;
  currentMovie?: Movie;
}

const initialMoviesState: MoviesState = {
  movies: [],
  moviesFetched: 0,
  pageSize: 10,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialMoviesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentMovie = action.payload;
        }
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        if (action.payload) {
          const movies = [...state.movies, ...action.payload];
          state.movies = movies;
          state.moviesFetched += action.payload.length;
        }
      });
  },
});

export const moviesReducer = moviesSlice.reducer;

export const selectMovies = (state: RootState) => state.movies.movies;

export const selectCurrentMovie = (state: RootState) => state.movies.currentMovie;

export const selectMovieById = (id: number) =>
  createSelector(selectMovies, (movies) => movies.find((movie) => movie.id === id));

export const selectPageSize = (state: RootState) => state.movies.pageSize;

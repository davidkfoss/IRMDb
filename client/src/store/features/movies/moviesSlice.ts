import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../../../models/movie';
import { RootState } from '../../store';
import { getFilteredMovies, getMovieById, getMovies } from './movieThunks';

interface MoviesState {
  movies: Movie[];
  moviesFetched: number;
  pageSize: number;
  currentMovie?: Movie;
  allFetched: boolean;
}

const initialMoviesState: MoviesState = {
  movies: [],
  moviesFetched: 0,
  pageSize: 10,
  allFetched: false,
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
          const fetchedMovies = action.payload;
          state.allFetched = fetchedMovies.length < state.pageSize;

          const movies = [...state.movies, ...fetchedMovies];
          state.movies = movies;
          state.moviesFetched += action.payload.length;
        }
      })
      .addCase(getFilteredMovies.fulfilled, (state, action) => {
        if (action.payload) {
          const fetchedMovies = action.payload;
          state.allFetched = fetchedMovies.length < state.pageSize;

          if (action.meta.arg.initial) {
            state.movies = fetchedMovies;
            state.moviesFetched = action.payload.length;
          } else {
            const movies = [...state.movies, ...fetchedMovies];
            state.movies = movies;
            state.moviesFetched += action.payload.length;
          }
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

export const selectAllFetched = (state: RootState) => state.movies.allFetched;

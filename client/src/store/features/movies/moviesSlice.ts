import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Filters } from '../../../components/filter/filterUtil';
import { Movie } from '../../../models/movie';
import { RootState } from '../../store';
import { getFilteredMovies, getMovieById, getMovies } from './movieThunks';

interface LoadingState {
  pending: boolean;
  fetchMorePending?: boolean;
  rejected: boolean;
  resolved: boolean;
}

const initialLoadingState: LoadingState = {
  pending: true,
  rejected: false,
  resolved: false,
};

interface MoviesState {
  movies: Movie[];
  moviesFetched: number;
  pageSize: number;
  currentMovie?: Movie;
  allFetched: boolean;
  filters: Filters;
  gridLoadingState: LoadingState;
  detailsLoadingState: LoadingState;
}

const initialMoviesState: MoviesState = {
  movies: [],
  moviesFetched: 0,
  pageSize: 12,
  allFetched: false,
  filters: {} as Filters,
  gridLoadingState: initialLoadingState,
  detailsLoadingState: initialLoadingState,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialMoviesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.detailsLoadingState = { pending: false, rejected: false, resolved: true };
        if (action.payload) {
          state.currentMovie = action.payload;
        }
      })
      .addCase(getMovieById.pending, (state) => {
        state.detailsLoadingState = { pending: true, rejected: false, resolved: false };
      })
      .addCase(getMovieById.rejected, (state) => {
        state.detailsLoadingState = { pending: false, rejected: true, resolved: false };
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.gridLoadingState = { pending: false, rejected: false, resolved: true };
        if (action.payload) {
          const fetchedMovies = action.payload;
          state.allFetched = fetchedMovies.length < state.pageSize;

          const movies = [...state.movies, ...fetchedMovies];
          state.movies = movies;
          state.moviesFetched += action.payload.length;
        }
      })
      .addCase(getMovies.pending, (state) => {
        state.gridLoadingState = { pending: true, rejected: false, resolved: false };
      })
      .addCase(getMovies.rejected, (state) => {
        state.gridLoadingState = { pending: false, rejected: true, resolved: false };
      })
      .addCase(getFilteredMovies.fulfilled, (state, action) => {
        state.gridLoadingState = { pending: false, fetchMorePending: false, rejected: false, resolved: true };
        if (action.payload) {
          state.filters = action.meta.arg.filters;

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
      })
      .addCase(getFilteredMovies.pending, (state, action) => {
        state.gridLoadingState = {
          pending: true,
          fetchMorePending: !action.meta.arg.initial,
          rejected: false,
          resolved: false,
        };
      })
      .addCase(getFilteredMovies.rejected, (state) => {
        state.gridLoadingState = { pending: false, fetchMorePending: false, rejected: true, resolved: false };
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

export const selectFilters = (state: RootState) => state.movies.filters;

export const selectGridLoadingState = (state: RootState) => state.movies.gridLoadingState;

export const selectDetailsLoadingState = (state: RootState) => state.movies.detailsLoadingState;

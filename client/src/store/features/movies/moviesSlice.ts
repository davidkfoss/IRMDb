import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../../../models/movie';
import { RootState } from '../../store';
import { getFilteredMovies, getMovieById, getMovies, searchMovies } from './movieThunks';

interface MoviesState {
  movies: Movie[];
  moviesFetched: number;
  pageSize: number;
  currentMovie?: Movie;
  newSearch: boolean;
}

const initialMoviesState: MoviesState = {
  movies: [],
  moviesFetched: 0,
  pageSize: 10,
  newSearch: false,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialMoviesState,
  reducers: {
    toggleNewSearch: (state) => {
      state.newSearch = !state.newSearch;
    },
  },
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
      })
      .addCase(getFilteredMovies.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.meta.arg.initial) {
            state.movies = action.payload;
            state.moviesFetched = action.payload.length;
          } else {
            const movies = [...state.movies, ...action.payload];
            state.movies = movies;
            state.moviesFetched += action.payload.length;
          }
        }
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        if (action.payload) {
          console.log(state.newSearch);
          if (state.newSearch) {
            state.movies = action.payload;
            state.moviesFetched = action.payload.length;
          } else {
            const movies = [...state.movies, ...action.payload];
            state.movies = movies;
            state.moviesFetched += action.payload.length;
          }
        }
      });
  },
});

export const { toggleNewSearch } = moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;

export const selectMovies = (state: RootState) => state.movies.movies;

export const selectCurrentMovie = (state: RootState) => state.movies.currentMovie;

export const selectMovieById = (id: number) =>
  createSelector(selectMovies, (movies) => movies.find((movie) => movie.id === id));

export const selectPageSize = (state: RootState) => state.movies.pageSize;

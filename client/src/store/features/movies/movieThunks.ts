import { createAsyncThunk } from '@reduxjs/toolkit';
import { mockMovies } from '../../../data/mockMovies';
import { Movie } from '../../../models/movie';
import mockPagination from '../../../util/mockPagination';
import { RootState } from '../../store';

export const getMovieById = createAsyncThunk<Movie | undefined, number, { state: RootState }>(
  'movies/getMovieById',
  async (id) => {
    console.log(`Fetching movie with id ${id}`);
    // TODO: Fetch movie from API
    return mockMovies.find((movie) => movie.id === id);
  }
);

export const getMovies = createAsyncThunk<Movie[] | undefined, void, { state: RootState }>(
  'movies/getMovies',
  async (_, { getState }) => {
    console.log(`Fetching movies`);

    const state = getState();
    const moviesFetchCount = state.movies.moviesFetched;
    const pageSize = state.movies.pageSize;

    // TODO: Fetch movies from API
    return mockPagination(mockMovies, moviesFetchCount / pageSize + 1);
  }
);

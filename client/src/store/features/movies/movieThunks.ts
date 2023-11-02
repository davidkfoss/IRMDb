import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../App';
import { Filters } from '../../../components/filter/filterUtil';
import { Movie } from '../../../models/movie';
import {
  getAllMoviesQuery,
  getMovieByIdQuery,
  getMovieRatingByIdQuery,
  getMoviesByFilterQuery,
} from '../../../queries/movieQueries';
import { RootState } from '../../store';

export const getMovieById = createAsyncThunk<
  Movie | undefined,
  { id: string; refetch?: boolean },
  { state: RootState }
>('movies/getMovieById', async ({ id, refetch = false }) => {
  const movie = await client
    .query({ query: getMovieByIdQuery, variables: { id: id }, fetchPolicy: refetch ? 'no-cache' : undefined })
    .then((result) => {
      return result.data.GetMovieById;
    });
  return movie;
});

export const getMovieRatingById = createAsyncThunk<
  number | undefined,
  { id: string; refetch?: boolean },
  { state: RootState }
>('movies/getMovieRatingById', async ({ id, refetch = false }) => {
  const rating = await client
    .query({ query: getMovieRatingByIdQuery, variables: { id: id }, fetchPolicy: refetch ? 'no-cache' : undefined })
    .then((result) => {
      return result.data.GetMovieById.rating;
    });
  return rating;
});

export const getMovies = createAsyncThunk<Movie[] | undefined, void, { state: RootState }>(
  'movies/getMovies',
  async (_, { getState }) => {
    const state = getState();
    const moviesFetchCount = state.movies.moviesFetched;
    const pageSize = state.movies.pageSize;

    const movies = await client
      .query({
        query: getAllMoviesQuery,
        variables: {
          offset: moviesFetchCount,
          limit: pageSize,
        },
      })
      .then((result) => {
        return result.data.GetAllMovies;
      });
    return movies;
  }
);

export const getFilteredMovies = createAsyncThunk<
  Movie[] | undefined,
  { filters: Filters; initial: boolean },
  { state: RootState }
>('movies/getFilteredMovies', async ({ filters, initial }, { getState }) => {
  const state = getState();

  const moviesFetchCount = initial ? 0 : state.movies.moviesFetched;
  const pageSize = state.movies.pageSize;

  const movies = await client
    .query({
      query: getMoviesByFilterQuery,
      variables: {
        genre: filters.genres,
        sortBy: filters.sortBy,
        direction: filters.direction,
        search: filters.search,
        offset: moviesFetchCount,
        limit: pageSize,
      },
    })
    .then((result) => {
      return result.data.GetMoviesByFilter;
    });

  return movies;
});

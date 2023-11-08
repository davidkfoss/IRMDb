import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../client';
import { Filters } from '../../../components/filter/filterUtil';
import { Movie } from '../../../models/movie';
import {
  getAllMoviesQuery,
  getMovieByIdQuery,
  getMovieRatingByIdQuery,
  getMoviesByFilterQuery,
} from '../../../queries/movieQueries';
import { RootState } from '../../store';

/**
 * A Redux Async Thunk that retrieves a movie by its ID.
 * @param id - The ID of the movie to retrieve.
 * @param refetch - Whether to bypass the cache and fetch the movie directly from the server.
 * @returns A promise that resolves to the retrieved movie, or undefined if the movie was not found.
 */
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

/**
 * A Redux Async Thunk that retrieves the rating of a movie by its ID.
 * @param id - The ID of the movie to retrieve the rating for.
 * @param refetch - Whether to bypass the cache and fetch the rating again.
 * @returns The rating of the movie, or undefined if it could not be retrieved.
 */
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

/**
 * A Redux Async Thunk that fetches movies from the server.
 * @returns A promise that resolves to an array of Movie objects, or undefined if the request fails.
 */
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

/**
 * A Redux Async Thunk that fetches a list of movies based on the provided filters.
 * @param filters - The filters to apply to the movie search.
 * @param initial - Whether this is the initial fetch or not.
 * @returns A promise that resolves to an array of Movie objects or undefined.
 */
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

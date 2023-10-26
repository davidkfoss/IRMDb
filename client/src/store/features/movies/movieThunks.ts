import { createAsyncThunk } from '@reduxjs/toolkit';
import { Filters, hasFiltersChanged } from '../../../components/filter/filterUtil';
import { Movie } from '../../../models/movie';
import mockPagination from '../../../util/mockPagination';
import { RootState } from '../../store';
import { getMovieByIdQuery, getAllMoviesQuery, getMoviesByFilterQuery } from '../../../queries/movieQueries';
import { client } from '../../../App';

export const getMovieById = createAsyncThunk<Movie | undefined, number, { state: RootState }>(
  'movies/getMovieById',
  async (id) => {
    console.log(`Fetching movie with id ${id}`);
    const movie = await client.query({ query: getMovieByIdQuery, variables: { id: id } }).then((result) => {
      return result.data.GetMovieById;
    });
    return movie;
  }
);

export const getMovies = createAsyncThunk<Movie[] | undefined, void, { state: RootState }>(
  'movies/getMovies',
  async (_, { getState }) => {
    console.log(`Fetching movies`);

    const state = getState();
    const moviesFetchCount = state.movies.moviesFetched;
    const pageSize = state.movies.pageSize;

    const movies = await client.query({ query: getAllMoviesQuery }).then((result) => {
      return result.data.GetAllMovies;
    });
    return mockPagination(movies, moviesFetchCount, pageSize);
  }
);

export const getFilteredMovies = createAsyncThunk<
  Movie[] | undefined,
  { filters: Filters; initial: boolean },
  { state: RootState }
>('movies/getFilteredMovies', async ({ filters, initial }, { getState }) => {
  const state = getState();
  const prevFilters = state.movies.filters;
  if (initial && !hasFiltersChanged(filters, prevFilters)) {
    console.log('Filters have not changed, returning cached movies');
    return;
  }
  console.log(`Fetching filtered movies`);

  const moviesFetchCount = initial ? 0 : state.movies.moviesFetched;
  const pageSize = state.movies.pageSize;

  // TODO: Fetch movies from API
  const movies = await client
    .query({
      query: getMoviesByFilterQuery,
      variables: {
        genre: filters.genres,
        sortBy: filters.sortBy,
        direction: filters.direction,
        search: filters.search,
      },
    })
    .then((result) => {
      return result.data.GetMoviesByFilter;
    });

  return mockPagination(movies, moviesFetchCount, pageSize);
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { directions } from '../../../components/filter/ascDesc/direction';
import { Filters } from '../../../components/filter/filterUtil';
import { mockMovies } from '../../../data/mockMovies';
import { Movie } from '../../../models/movie';
import mockPagination from '../../../util/mockPagination';
import { RootState } from '../../store';
import { getFilteredMoviesQuery, getMovieQuery, getMoviesQuery } from '../../../queries/queries';
import { client } from '../../../App';

export const getMovieById = createAsyncThunk<Movie | undefined, number, { state: RootState }>(
  'movies/getMovieById',
  async (id) => {
    console.log(`Fetching movie with id ${id}`);
    const movie = await client.query({query: getMovieQuery, variables: {id: id}}).then((result) => {return result.data.movie})
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
    
    const movies = await client.query({query: getMoviesQuery}).then((result) => {return result.data.movies})
    return mockPagination(movies, moviesFetchCount, pageSize);
  }
);

export const getFilteredMovies = createAsyncThunk<
  Movie[] | undefined,
  { filters: Filters; initial: boolean },
  { state: RootState }
>('movies/getFilteredMovies', async ({ filters, initial }, { getState }) => {
  console.log(`Fetching filtered movies`);

  const state = getState();
  const moviesFetchCount = initial ? 0 : state.movies.moviesFetched;
  const pageSize = state.movies.pageSize;

  // TODO: Fetch movies from API
  const movies = await client.query({
    query: getFilteredMoviesQuery,
    variables: {
      genre: filters.genres,
      sortBy: filters.sortBy,
      direction: filters.direction,
      search: filters.search,
    },
  }).then((result) => {return result.data.moviesWithFilter})

  console.log(movies);
  return mockPagination(movies, moviesFetchCount, pageSize);
});

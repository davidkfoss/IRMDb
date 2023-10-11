import { createAsyncThunk } from '@reduxjs/toolkit';
import { directions } from '../../../components/filter/ascDesc/direction';
import { Filters } from '../../../components/filter/filterUtil';
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
  const movies = mockMovies.filter((movie) => {
    if (filters.genres) {
      for (const genre of filters.genres) {
        if (!movie.genre) return true;
        if (!movie.genre.includes(genre)) {
          return false;
        }
      }
    }
    return true;
  });

  movies.sort((a, b) => {
    // if (filters.sortBy === 'Rating') {
    //   return a.rating - b.rating;

    const { direction } = filters;
    const sign = direction === directions[0] ? 1 : -1;

    if (filters.sortBy === 'Name') {
      return a.title.localeCompare(b.title) * sign;
    } else if (filters.sortBy === 'Release Date') {
      return (new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()) * sign;
    } else if (filters.sortBy === 'Popularity') {
      return (a.popularity - b.popularity) * sign;
    }
    return 0;
  });

  console.log(movies);
  return mockPagination(movies, moviesFetchCount / pageSize + 1);
});

export const searchMovies = createAsyncThunk<Movie[] | undefined, string, { state: RootState }>(
  'movies/searchMovies',
  async (searchInput, { getState }) => {
    console.log(`Fetching movies`);

    const state = getState();
    const moviesFetchCount = state.movies.moviesFetched;
    const pageSize = state.movies.pageSize;
    const filteredMovies = mockMovies.filter((movie) => movie.title.toLowerCase().includes(searchInput.toLowerCase()));

    // TODO: Fetch movies from API
    return mockPagination(filteredMovies, moviesFetchCount / pageSize + 1);
  }
);

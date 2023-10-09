import { createAsyncThunk } from '@reduxjs/toolkit';
import { mockMovies } from '../../../data/mockMovies';
import { Movie } from '../../../models/movie';
import { RootState } from '../../store';

export const getMovieById = createAsyncThunk<Movie | undefined, number, { state: RootState }>(
  'movies/getMovieById',
  async (id, { getState }) => {
    const { movies } = getState();
    if (movies.movies.find((movie) => movie.id === id)) {
      console.log(`Movie with id ${id} already exists in store`);
      return;
    }

    console.log(`Fetching movie with id ${id}`);
    // TODO: Fetch movie from API
    return mockMovies.find((movie) => movie.id === id);
  }
);

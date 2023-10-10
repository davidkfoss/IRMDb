import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../components/button/Button';
import { MovieGrid } from '../../components/movieGrid/MovieGrid';
import useDebounceDispatch from '../../hooks/useDebounceDispatch';
import { getMovies } from '../../store/features/movies/movieThunks';
import { selectMovies, selectPageSize } from '../../store/features/movies/moviesSlice';

export const Movies = () => {
  const dispatch = useDebounceDispatch(100);
  const movies = useSelector(selectMovies);
  const pageSize = useSelector(selectPageSize);

  const loadMovies = useCallback(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies.length < pageSize) {
      loadMovies();
    }
  }, [dispatch, movies.length, loadMovies, pageSize]);

  if (movies.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <MovieGrid movies={movies} />
      <Button onClick={loadMovies}>Load {pageSize} more movies</Button>
    </>
  );
};

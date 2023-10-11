import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../components/button/Button';
import { MovieFilter } from '../../components/filter/MovieFilter';
import { Filters, initialFilters } from '../../components/filter/filterUtil';
import { MovieGrid } from '../../components/movieGrid/MovieGrid';
import useDebounceDispatch from '../../hooks/useDebounceDispatch';
import { getFilteredMovies } from '../../store/features/movies/movieThunks';
import { selectAllFetched, selectMovies, selectPageSize } from '../../store/features/movies/moviesSlice';
import './Movies.css';

export const Movies = () => {
  const dispatch = useDebounceDispatch(50);
  const movies = useSelector(selectMovies);
  const pageSize = useSelector(selectPageSize);
  const allFetched = useSelector(selectAllFetched);

  const filters = useRef(initialFilters);

  const onFilterChange = useCallback(
    (filter: Filters) => {
      filters.current = filter;
      dispatch(getFilteredMovies({ filters: filter ?? filters.current, initial: true }));
    },
    [dispatch]
  );

  return (
    <>
      <div className='movie-filter-container'>
        <MovieFilter onChange={onFilterChange} />
      </div>
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          {!allFetched && (
            <Button onClick={() => dispatch(getFilteredMovies({ filters: filters.current, initial: false }))}>
              Load {pageSize} more movies
            </Button>
          )}
        </>
      )}
    </>
  );
};

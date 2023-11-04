import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../components/button/Button';
import { MovieFilter } from '../../components/filter/MovieFilter';
import { Filters, initialFilters } from '../../components/filter/filterUtil';
import { MovieGrid } from '../../components/movieGrid/MovieGrid';
import useDebounceDispatch from '../../hooks/useDebounceDispatch';
import { getFilteredMovies } from '../../store/features/movies/movieThunks';
import {
  selectAllFetched,
  selectGridLoadingState,
  selectMovies,
  selectPageSize,
} from '../../store/features/movies/moviesSlice';
import './Movies.css';

export const Movies = () => {
  const dispatch = useDebounceDispatch(50);
  const movies = useSelector(selectMovies);
  const pageSize = useSelector(selectPageSize);
  const allFetched = useSelector(selectAllFetched);
  const loadingState = useSelector(selectGridLoadingState);

  const filters = useRef(initialFilters);

  const onFilterChange = useCallback(
    (filter: Filters) => {
      filters.current = filter;
      dispatch(getFilteredMovies({ filters: filter ?? filters.current, initial: true }));
    },
    [dispatch]
  );

  const onLoadButtonClicked = () => {
    dispatch(getFilteredMovies({ filters: filters.current, initial: false }));
  };

  const onLoadButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    onLoadButtonClicked();

    // Focus on the last movie in the grid after loading more movies
    // This is a workaround for the fact that the focus is lost when more movies are loaded
    const isFocused = document.activeElement?.id === 'load-more';
    if (isFocused) {
      const movieGrid = document.getElementById('movie-grid');
      const children = movieGrid?.children;
      const lastChild = children?.item(children.length - 1)?.children?.item(0);
      if (lastChild) {
        (lastChild as HTMLElement).focus();
      }
    }
  };

  const showLoadMoreButton =
    !allFetched && !loadingState.rejected && (!loadingState.pending || loadingState.fetchMorePending);

  return (
    <main>
      <section aria-label='Movie filters' className='movie-filter-container'>
        <MovieFilter onChange={onFilterChange} />
      </section>
      <section aria-label='Movie grid'>
        <MovieGrid movies={movies} id='movie-grid' {...loadingState} />
      </section>
      {showLoadMoreButton && (
        <Button
          id='load-more'
          onClick={onLoadButtonClicked}
          onKeyDown={onLoadButtonKeyDown}
          loading={loadingState.pending}
          style={{ width: '12rem', height: '2rem' }}
          role='button'
          aria-label={`Load ${pageSize} more movies`}
        >
          Load {pageSize} more movies
        </Button>
      )}
    </main>
  );
};

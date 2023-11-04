import ClipLoader from 'react-spinners/ClipLoader';
import { Movie } from '../../models/movie';
import { MovieCard } from '../movieCard/MovieCard';
import './MovieGrid.css';

interface MovieGridProps {
  movies: Movie[];
  id: string;
  resolved?: boolean;
  pending?: boolean;
  fetchMorePending?: boolean;
  rejected?: boolean;
}

export const MovieGrid = ({ movies, id, pending: loading, fetchMorePending, rejected: error }: MovieGridProps) => {
  if (loading && !fetchMorePending) {
    return (
      <div role='alert' aria-busy='true' aria-live='polite'>
        <ClipLoader size={128} color='#1be3e3' cssOverride={{ marginTop: '2rem' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div role='alert'>
        <h3>Something went wrong</h3>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div role='alert'>
        <h3>No movies found matching the current filters ...</h3>
      </div>
    );
  }

  return (
    <section className='movie-grid' id={id}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} scale={1.15} />
      ))}
    </section>
  );
};

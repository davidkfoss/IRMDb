import { Movie } from '../../models/movie';
import { MovieCard } from '../movieCard/MovieCard';
import './MovieGrid.css';

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className='movie-grid'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} scale={1.15} />
      ))}
    </div>
  );
};

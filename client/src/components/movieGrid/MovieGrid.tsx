import { Movie } from '../../models/movie';
import { MovieCard } from '../movieCard/MovieCard';
import './MovieGrid.css';

interface MovieGridProps {
  movies: Movie[];
  id: string;
}

export const MovieGrid = ({ movies, id }: MovieGridProps) => {
  return (
    <div className='movie-grid' id={id}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} scale={1.15} />
      ))}
    </div>
  );
};

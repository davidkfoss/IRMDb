import { useNavigate } from 'react-router-dom';
import { Movie } from '../../models/movie';
import { getYear } from '../../util/parseDate';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  scale?: number;
}

export const MovieCard = ({ movie, scale = 1 }: MovieCardProps) => {
  const navigate = useNavigate();

  const onMovieClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div className='movie-card-border' onClick={onMovieClick}>
      <div
        className='movie-card'
        style={{
          backgroundImage: `url(${movie.posterUrl})`,
          width: `${15 * scale}rem`,
          height: `${22.22 * scale}rem`,
        }}>
        <div className='movie-card-image-overlay'>
          <div className='movie-info'>
            <h3>{movie.title}</h3>
            <span>{getYear(movie.releaseDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

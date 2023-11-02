import { Rating } from '@mui/material';
import { round } from 'lodash';
import { useMemo } from 'react';
import { Pill } from '../../../components/pill/Pill';
import { Movie } from '../../../models/movie';
import { getYear } from '../../../util/parseDate';

export const MovieInfoDetailsSection = ({ movie }: { movie: Movie }) => {
  const roundedRating = useMemo(() => round(movie.rating ?? 5, 2), [movie]);

  return (
    <div className='movie-info-info'>
      <div className='movie-info-rating-container'>
        <Rating name='half-rating-read' value={roundedRating} readOnly precision={0.5} aria-labelledby='movie-rating' />
        <span className='movie-info-rating-average' id='movie-rating'>
          {roundedRating}/5
        </span>
      </div>
      <h1>{movie.title}</h1>
      <div className='movie-info-genres'>
        {movie.genre.map((genre) => (
          <Pill key={genre} className='genre-pill'>
            {genre}
          </Pill>
        ))}
      </div>
      <span>{movie.overview}</span>
      <h3>{getYear(movie.releaseDate)}</h3>
    </div>
  );
};

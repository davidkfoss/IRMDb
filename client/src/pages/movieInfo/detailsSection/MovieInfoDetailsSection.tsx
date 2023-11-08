import StarIcon from '@mui/icons-material/Star';
import { Rating } from '@mui/material';
import { round } from 'lodash';
import { useMemo } from 'react';
import { Pill } from '../../../components/pill/Pill';
import { Movie } from '../../../models/movie';
import { getYear } from '../../../util/parseDate';

export const MovieInfoDetailsSection = ({ movie }: { movie: Movie }) => {
  /**
   * The rounded rating of the movie.
   * If the movie rating is null, the default value is 5.
   */
  const roundedRating = useMemo(() => round(movie.rating ?? 5, 2), [movie]);

  return (
    <section className='movie-info-info' aria-label='Movie Information'>
      <div className='movie-info-rating-container'>
        <Rating
          name='half-rating-read'
          value={roundedRating}
          readOnly
          precision={0.5}
          aria-label={`Movie rating: ${roundedRating} out of 5`}
          emptyIcon={<StarIcon color='info' style={{ opacity: 0.4 }} fontSize='inherit' />}
        />
        <span className='movie-info-rating-average'>{roundedRating}/5</span>
      </div>
      <h1>{movie.title}</h1>
      <div className='movie-info-genres' aria-label='Movie genres'>
        {movie.genre.map((genre) => (
          <Pill key={genre} className='genre-pill'>
            {genre}
          </Pill>
        ))}
      </div>
      <p>{movie.overview}</p>
      <h2>{getYear(movie.releaseDate)}</h2>
    </section>
  );
};

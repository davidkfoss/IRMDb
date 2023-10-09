import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Pill } from '../../components/pill/Pill';
import { getMovieById } from '../../store/features/movies/movieThunks';
import { selectMovieById } from '../../store/features/movies/moviesSlice';
import { useAppDispatch } from '../../store/store';
import { getYear } from '../../util/parseDate';
import './MovieInfo.css';

export const MovieInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { id: idParam } = useParams();

  const id = parseInt(idParam || '-1');

  const dispatch = useAppDispatch();
  const movie = useSelector(selectMovieById(id));

  useEffect(() => {
    if (!movie) {
      dispatch(getMovieById(id));
    }
  }, [id, movie, dispatch]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const onImageClick = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden';
  };

  const onClickAway = () => {
    setShowPopup(false);
    document.body.style.overflow = 'auto';
  };

  const consumeEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      {showPopup && (
        <div className='movie-popup' onClick={onClickAway}>
          <img src={movie.posterUrl} className='movie-info-image-popup' onClick={consumeEvent} />
        </div>
      )}
      <div className='movie-info-container'>
        <div className='movie-info-info'>
          <h1>{movie.title}</h1>
          <div className='movie-info-genres'>
            {movie.genre.map((genre) => (
              <Pill key={genre}>{genre}</Pill>
            ))}
          </div>
          <span>{movie.overview}</span>
          <h3>{getYear(movie.releaseDate)}</h3>
        </div>
        <img src={movie.posterUrl} className='movie-info-image-container' onClick={onImageClick} />
      </div>
    </>
  );
};

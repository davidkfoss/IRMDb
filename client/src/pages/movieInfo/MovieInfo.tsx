import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { MoviePopup } from '../../components/moviePopup/MoviePopup';
import { getMovieById } from '../../store/features/movies/movieThunks';
import { selectCurrentMovie, selectDetailsLoadingState } from '../../store/features/movies/moviesSlice';
import { getReviewsOnMovie } from '../../store/features/reviews/reviewThunks';
import { useAppDispatch } from '../../store/store';
import './MovieInfo.css';
import { MovieInfoDetailsSection } from './detailsSection/MovieInfoDetailsSection';
import { MovieInfoReviewSection } from './reviewSection/MovieInfoReviewSection';

export const MovieInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const id = idParam || 'NULL-1';

  const dispatch = useAppDispatch();
  const movie = useSelector(selectCurrentMovie);
  const { resolved, rejected, pending } = useSelector(selectDetailsLoadingState);

  useEffect(() => {
    dispatch(getMovieById({ id }));
    dispatch(getReviewsOnMovie({ id: id, refetch: true }));
  }, [id, dispatch]);

  if (rejected || (resolved && !movie)) {
    return <div role='alert'>Something went wrong! Try reloading or check if the ID is correct ...</div>;
  }

  const onBackClick = () => {
    // If there exists a history we want to go back to the previous site,
    // else we want to go back to the movies page
    const historyExists = location.key !== 'default';
    if (historyExists) {
      navigate(-1);
    } else {
      navigate('/movies');
    }
  };

  return (
    <>
      {showPopup && movie && <MoviePopup movie={movie} onClose={() => setShowPopup(false)} />}

      <main className='movie-info-container' aria-disabled={showPopup}>
        <IconButton
          color='info'
          aria-label='Go back'
          sx={{ position: 'absolute', top: '2rem', left: '0.5rem' }}
          onClick={onBackClick}
        >
          <ArrowBackIcon fontSize='large' />
          Go back
        </IconButton>
        {pending ? (
          <ClipLoader
            size={128}
            color='#1be3e3'
            cssOverride={{ alignSelf: 'center', justifySelf: 'center', margin: '15vh 0' }}
            aria-label='Loading'
          />
        ) : (
          <>
            <MovieInfoDetailsSection movie={movie!} />
            <h2 id='movie-info-poster'>Poster</h2>
            <img
              src={movie?.posterUrl}
              className='movie-info-image-container'
              onClick={() => setShowPopup(true)}
              alt={`${movie?.title} poster`}
              aria-describedby='movie-info-poster'
            />
          </>
        )}
      </main>
      <MovieInfoReviewSection movieId={id} />
      <Toaster />
    </>
  );
};

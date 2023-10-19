import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { Button, IconButton, Rating, TextareaAutosize } from '@mui/material';
import _, { random } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MoviePopup } from '../../components/moviePopup/MoviePopup';
import { Pill } from '../../components/pill/Pill';
import { Review } from '../../components/review/Review';
import useDebounceDispatch from '../../hooks/useDebounceDispatch';
import { getMovieById } from '../../store/features/movies/movieThunks';
import { selectCurrentMovie } from '../../store/features/movies/moviesSlice';
import { addReviewOnMovie } from '../../store/features/reviews/reviewThunks';
import { selectReviewInfoOnMovie } from '../../store/features/reviews/reviewsSlice';
import { getYear } from '../../util/parseDate';
import './MovieInfo.css';

const initialReviewInfo = {
  reviews: [],
  ratingAverage: 5,
};

export const MovieInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const id = parseInt(idParam || '-1');

  const dispatch = useDebounceDispatch(100);
  const movie = useSelector(selectCurrentMovie);
  const { reviews, ratingAverage } = useSelector(selectReviewInfoOnMovie(id)) || initialReviewInfo;

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);

  const allReviews = useMemo(
    () => _.toPairs(reviews).map(([authorId, review]) => ({ authorId: parseInt(authorId), ...review })),
    [reviews]
  );

  useEffect(() => {
    dispatch(getMovieById(id));
  }, [id, dispatch]);

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const roundedRating = useMemo(() => Math.round(ratingAverage * 10) / 10, [ratingAverage]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const onSubmit = () => {
    if (comment === '') {
      toast.error('Comment cannot be empty', { style: { background: '#333', color: '#fff' } });
      return;
    }

    setComment('');
    setRating(3);
    dispatch(
      addReviewOnMovie({
        movieId: id,

        // TODO: get authorId from auth
        authorId: random(0, 1000),
        review: { rating, comment },
      })
    );
  };

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
      {showPopup && <MoviePopup movie={movie} onClose={() => setShowPopup(false)} />}

      <div className='movie-info-container' aria-disabled={showPopup}>
        <IconButton color='info' sx={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }} onClick={onBackClick}>
          <ArrowBackIcon fontSize='large' />
          Go back
        </IconButton>
        <div className='movie-info-info'>
          <div className='movie-info-rating-container'>
            <Rating
              name='half-rating-read'
              value={ratingAverage ?? 5}
              readOnly
              precision={0.5}
              aria-labelledby='movie-rating'
            />
            <span className='movie-info-rating-average' id='movie-rating'>
              {roundedRating}/5
            </span>
          </div>
          <h1>{movie.title}</h1>
          <div className='movie-info-genres'>
            {movie.genre.map((genre) => (
              <Pill key={genre}>{genre}</Pill>
            ))}
          </div>
          <span>{movie.overview}</span>
          <h3>{getYear(movie.releaseDate)}</h3>
        </div>
        <img
          src={movie.posterUrl}
          className='movie-info-image-container'
          onClick={() => setShowPopup(true)}
          alt={`${movie.title} poster`}
        />
      </div>
      <div className='movie-info-reviews'>
        <h2>Reviews:</h2>
        {allReviews.map((review) => (
          <Review key={review.authorId} {...review} />
        ))}
        <form className='movie-info-form'>
          <Rating
            name='rating'
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue || 0);
            }}
            emptyIcon={<StarIcon color='info' style={{ opacity: 0.6 }} fontSize='inherit' />}
          />
          <TextareaAutosize
            aria-label='minimum height'
            minRows={3}
            placeholder='Write your review ...'
            className='movie-info-textarea'
            name='comment'
            value={comment}
            onChange={onCommentChange}
          />
          <br />

          <Button variant='contained' onClick={onSubmit} style={{ font: 'inherit' }} aria-label='Add review'>
            Add review
          </Button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

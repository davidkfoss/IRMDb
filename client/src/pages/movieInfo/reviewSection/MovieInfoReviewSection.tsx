import StarIcon from '@mui/icons-material/Star';
import { Button, Rating, TextareaAutosize } from '@mui/material';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useReview } from '../../../hooks/useReview';
import { useUser } from '../../../hooks/useUser';
import { getMovieRatingById } from '../../../store/features/movies/movieThunks';
import { addReviewOnMovie, getReviewsOnMovie } from '../../../store/features/reviews/reviewThunks';
import { selectReviewInfoOnMovie, selectReviewLoadingStates } from '../../../store/features/reviews/reviewsSlice';
import { useAppDispatch } from '../../../store/store';
import customToast from '../../../util/toastWrapper';
import { Reviews } from '../../feed/reviewSection/Reviews';

interface MovieInfoReviewSectionProps {
  movieId: string;
}

export const MovieInfoReviewSection = ({ movieId }: MovieInfoReviewSectionProps) => {
  const dispatch = useAppDispatch();
  const reviews = useSelector(selectReviewInfoOnMovie(movieId));
  const user = useUser();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const { pending, resolved, rejected } = useSelector(selectReviewLoadingStates());

  // Define necessary callbacks for review actions
  const onReviewDeleteSuccess = useCallback(() => {
    customToast.success('Review deleted!');
    return dispatch(getMovieRatingById({ id: movieId, refetch: true }));
  }, [dispatch, movieId]);

  const onVoteSuccess = useCallback(() => {
    customToast.success('Vote added!');
    return dispatch(getReviewsOnMovie({ id: movieId, refetch: true }));
  }, [dispatch, movieId]);

  const onDeleteVoteSuccess = useCallback(() => {
    customToast.success('Vote removed!');
    return dispatch(getReviewsOnMovie({ id: movieId, refetch: true }));
  }, [dispatch, movieId]);

  // Use the useReview hook to get necessary review actions
  const { onReviewDelete, onVote, onDeleteVote, canDelete } = useReview({
    onReviewDeleteSuccess,
    onVoteSuccess,
    onDeleteVoteSuccess,
  });

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      customToast.error('You must be logged in to add a review');
      return;
    }

    if (comment === '') {
      customToast.error('Comment cannot be empty');
      return;
    }

    setComment('');
    setRating(1);
    dispatch(
      addReviewOnMovie({
        movieId,
        authorEmail: user.email,
        rating,
        comment,
      })
    )
      .unwrap()
      .then((review) => {
        if (!review) {
          customToast.error('You have already added a review for this movie');
          return Promise.reject();
        } else {
          return dispatch(getMovieRatingById({ id: movieId, refetch: true }));
        }
      })
      .then(() => {
        customToast.success('Review added!');
      });
  };

  return (
    <section aria-label='Movie reviews' className='movie-info-reviews'>
      <h2>Reviews</h2>
      <Reviews
        onReviewDelete={onReviewDelete}
        canDelete={canDelete}
        onVote={onVote}
        onDeleteVote={onDeleteVote}
        reviews={reviews}
        resolved={resolved}
        pending={pending}
        rejected={rejected}
        isFeed={false}
      />
      <form aria-label='Add review form' className='movie-info-form' onSubmit={onSubmit}>
        <Rating
          name='rating'
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue || 1);
          }}
          emptyIcon={<StarIcon color='info' style={{ opacity: 0.6 }} fontSize='inherit' />}
        />
        <TextareaAutosize
          aria-label='Write your review'
          id='textarea-comment'
          minRows={3}
          placeholder='Write your review ...'
          className='movie-info-textarea'
          name='comment'
          value={comment}
          onChange={onCommentChange}
        />
        <br />

        <Button variant='contained' type='submit' style={{ font: 'inherit' }} aria-label='Add review button'>
          Add review
        </Button>
      </form>
    </section>
  );
};

import StarIcon from '@mui/icons-material/Star';
import { Button, Rating, TextareaAutosize } from '@mui/material';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReviewCard } from '../../../components/reviewCard/ReviewCard';
import { useUser } from '../../../hooks/useUser';
import { Review } from '../../../models/review';
import { getMovieRatingById } from '../../../store/features/movies/movieThunks';
import {
  addReviewOnMovie,
  addVoteOnReview,
  deleteReviewOnMovie,
  deleteVoteOnReview,
  getReviewsOnMovie,
} from '../../../store/features/reviews/reviewThunks';
import { selectReviewInfoOnMovie } from '../../../store/features/reviews/reviewsSlice';
import { useAppDispatch } from '../../../store/store';
import customToast from '../../../util/toastWrapper';

interface MovieInfoReviewSectionProps {
  movieId: string;
}

export const MovieInfoReviewSection = ({ movieId }: MovieInfoReviewSectionProps) => {
  const dispatch = useAppDispatch();
  const reviews = useSelector(selectReviewInfoOnMovie(movieId));
  const user = useUser();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = () => {
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

  const canDelete = useCallback(
    (review: Review) => {
      if (!user) {
        return false;
      }

      return review.meta.authorEmail === user.email;
    },
    [user]
  );

  const onReviewDelete = useCallback(
    (review: Review) => {
      if (!canDelete(review)) return;

      dispatch(deleteReviewOnMovie({ movieId, id: review.id }))
        .unwrap()
        .then(() => {
          customToast.success('Review deleted!');
          return dispatch(getMovieRatingById({ id: movieId, refetch: true }));
        });
    },
    [dispatch, movieId, canDelete]
  );

  const onVote = useCallback(
    (review: Review) => {
      if (!user) {
        customToast.error('You must be logged in to vote');
        return;
      }

      if (review.votes.includes({ vote: true, user: user.email })) {
        customToast.error('You have already voted on this review');
        return;
      }

      dispatch(
        addVoteOnReview({
          vote: true,
          reviewId: review.id,
          authorEmail: user.email,
        })
      )
        .unwrap()
        .then(() => {
          customToast.success('Vote added!');
          return dispatch(getReviewsOnMovie({ id: movieId, refetch: true }));
        });
    },
    [dispatch, user, movieId]
  );

  const onDeleteVote = useCallback(
    (review: Review) => {
      if (!user) {
        customToast.error('You must be logged in to vote');
        return;
      }

      if (!(review.votes.filter((vote) => vote.user === user.email).length > 0)) {
        customToast.error('You have not voted on this review');
        return;
      }

      dispatch(
        deleteVoteOnReview({
          reviewId: review.id,
          authorEmail: user.email,
        })
      )
        .unwrap()
        .then(() => {
          customToast.success('Vote removed!');
          return dispatch(getReviewsOnMovie({ id: movieId, refetch: true }));
        });
    },
    [dispatch, user, movieId]
  );

  return (
    <div className='movie-info-reviews'>
      <h2>Reviews</h2>
      {reviews &&
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onDelete={() => onReviewDelete(review)}
            canDelete={canDelete(review)}
            onVote={() => onVote(review)}
            canVote={!!user && !(review.votes.filter((vote) => vote.user === user.email).length > 0)}
            onDeleteVote={() => onDeleteVote(review)}
            isLoggedIn={!!user}
            isFeed={false}
          />
        ))}
      <form className='movie-info-form'>
        <Rating
          name='rating'
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue || 1);
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
  );
};

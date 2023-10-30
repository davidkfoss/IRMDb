import StarIcon from '@mui/icons-material/Star';
import { Button, Rating, TextareaAutosize } from '@mui/material';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { ReviewCard } from '../../../components/reviewCard/ReviewCard';
import useDebounceDispatch from '../../../hooks/useDebounceDispatch';
import { useUser } from '../../../hooks/useUser';
import { addReviewOnMovie } from '../../../store/features/reviews/reviewThunks';
import { selectReviewInfoOnMovie } from '../../../store/features/reviews/reviewsSlice';

const initialReviewInfo = {
  reviews: [],
  ratingAverage: 5,
};

interface MovieInfoReviewSectionProps {
  movieId: string;
}

export const MovieInfoReviewSection = ({ movieId }: MovieInfoReviewSectionProps) => {
  const dispatch = useDebounceDispatch(100);
  const reviews = useSelector(selectReviewInfoOnMovie(movieId)) || initialReviewInfo;
  const user = useUser();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);

  const allReviews = useMemo(
    () => _.toPairs(reviews).map(([authorEmail, review]) => ({ authorEmail: authorEmail, ...review })),
    [reviews]
  );

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = () => {
    if (!user) {
      toast.error('You must be logged in to add a review', { style: { background: '#333', color: '#fff' } });
      return;
    }

    if (comment === '') {
      toast.error('Comment cannot be empty', { style: { background: '#333', color: '#fff' } });
      return;
    }

    setComment('');
    setRating(3);
    dispatch(
      addReviewOnMovie({
        movieId,
        authorEmail: user.email,
        rating,
        comment,
      })
    );
  };

  return (
    <div className='movie-info-reviews'>
      <h2>Reviews</h2>
      {allReviews.map((review) => (
        <ReviewCard key={review.authorEmail} review={review} />
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
  );
};

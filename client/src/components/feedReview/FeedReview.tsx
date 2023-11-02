import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { Review } from '../../models/review';
import './ReviewCard.css';
import { ReviewInfo } from '../reviewCard/reviewInfo/ReviewInfo';
import { Rating } from '@mui/material';
import { blue } from '@mui/material/colors';

interface ReviewProps {
  review: Review;
  onDelete: () => void;
  canDelete: boolean;
}

export const FeedReview = ({ review, onDelete, canDelete }: ReviewProps) => {
  const { comment } = review;

  return (
    <div className='review-container'>
      <Rating name='read-only' value={review.rating} readOnly style={{ color: blue[100] }} />
      <div className='review-info'>
        <ReviewInfo review={review} />
        {canDelete && (
          <IconButton aria-label='delete' size='small' onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      <div className='review-comment'>{comment}</div>
    </div>
  );
};

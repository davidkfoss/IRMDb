import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { Review } from '../../models/review';
import './ReviewCard.css';
import { ReviewInfo } from './reviewInfo/ReviewInfo';

interface ReviewProps {
  review: Review;
  onDelete: () => void;
  canDelete: boolean;
}

export const ReviewCard = ({ review, onDelete, canDelete }: ReviewProps) => {
  const { comment } = review;

  return (
    <div className='review-container'>
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

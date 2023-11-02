import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Review } from '../../models/review';
import { ReviewInfo } from './reviewInfo/ReviewInfo';
import './FeedReviewCard.css';

interface ReviewProps {
  review: Review;
  onDelete: () => void;
  canDelete: boolean;
  onVote: () => void;
  canVote: boolean;
}

export const FeedReviewCard = ({ review, onDelete, canDelete, onVote, canVote }: ReviewProps) => {
  return (
    <div className='review-container'>
      <div className='review-info'>
        <ReviewInfo review={review} />
        {canDelete ? (
          <IconButton aria-label='delete' size='small' onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        ) : canVote ? (
          <IconButton aria-label='upvote' size='small' onClick={onVote}>
            <ArrowCircleUpIcon style={{ color: 'white' }} />
          </IconButton>
        ) : (
          <IconButton aria-label='upvote' size='large' disabled>
            <ArrowCircleUpIcon style={{ color: 'green' }} />
          </IconButton>
        )}
      </div>
      <h3 className='review-title'>{review.meta.movieTitle}</h3>
      <p className='review-votes'>Upvotes: {review.votes.length}</p>
      <div className='review-comment'>{review.comment}</div>
    </div>
  );
};

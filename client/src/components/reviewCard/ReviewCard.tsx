import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { IconButton } from '@mui/material';
import { Review } from '../../models/review';
import { ReviewInfo } from './reviewInfo/ReviewInfo';
import './ReviewCard.css';

interface ReviewProps {
  review: Review;
  onDelete: () => void;
  canDelete: boolean;
  onVote: () => void;
  onDeleteVote: () => void;
  canVote: boolean;
  isLoggedIn: boolean;
  isFeed: boolean;
}

export const ReviewCard = ({
  review,
  onDelete,
  canDelete,
  onVote,
  onDeleteVote,
  canVote,
  isFeed,
  isLoggedIn,
}: ReviewProps) => {
  const { comment } = review;

  return (
    <div className='review-container'>
      <div className='review-info'>
        <ReviewInfo review={review} />
        {canDelete ? (
          <IconButton aria-label='delete' size='large' onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        ) : canVote ? (
          <IconButton aria-label='upvote' size='large' onClick={onVote}>
            <ArrowCircleUpIcon style={{ color: 'white' }} />
          </IconButton>
        ) : isLoggedIn ? (
          <IconButton aria-label='upvote' size='large' onClick={onDeleteVote}>
            <ArrowCircleUpIcon style={{ color: 'green' }} />
          </IconButton>
        ) : (
          <IconButton aria-label='upvote' size='small' disabled onClick={onVote}>
            <ArrowCircleUpIcon style={{ color: 'grey' }} />
          </IconButton>
        )}
      </div>
      <p className='review-votes'>Upvotes: {review.votes.length}</p>
      {isFeed && <h3 className='review-title'>{review.meta.movieTitle}</h3>}
      <div className='review-comment'>{comment}</div>
    </div>
  );
};

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { Review } from '../../models/review';
import './ReviewCard.css';
import { ReviewInfo } from './reviewInfo/ReviewInfo';

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
        <ReviewInfo review={review} showTitle={isFeed} />
        <div className='review-buttons-container'>
          {canDelete && (
            <IconButton aria-label='delete' size='large' onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          )}
          <div className='review-upvotes-container'>
            {canVote && !canDelete ? (
              <IconButton aria-label='upvote' size='large' onClick={onVote}>
                <ArrowCircleUpIcon style={{ color: 'white' }} />
              </IconButton>
            ) : isLoggedIn && !canDelete ? (
              <IconButton aria-label='upvote' size='large' onClick={onDeleteVote}>
                <ArrowCircleUpIcon style={{ color: 'rgb(70, 192, 0)' }} />
              </IconButton>
            ) : (
              <IconButton aria-label='upvote' size='large' disabled>
                <ArrowCircleUpIcon style={{ color: 'rgb(172, 172, 172)' }} />
              </IconButton>
            )}
            <p className='review-votes'>{review.votes.length}</p>
          </div>
        </div>
      </div>
      <div className='review-comment'>{comment}</div>
    </div>
  );
};

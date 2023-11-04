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
    <article className='review-container'>
      <header className='review-info'>
        <ReviewInfo review={review} showTitle={isFeed} />
        <div className='review-buttons-container'>
          {canDelete && (
            <IconButton aria-label='Delete review' size='large' onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          )}
          <div className='review-upvotes-container'>
            {canVote && !canDelete ? (
              <IconButton aria-label='Upvote review' size='large' onClick={onVote}>
                <ArrowCircleUpIcon style={{ color: 'white' }} />
              </IconButton>
            ) : isLoggedIn && !canDelete ? (
              <IconButton aria-label='Remove upvote from review' size='large' onClick={onDeleteVote}>
                <ArrowCircleUpIcon style={{ color: 'rgb(70, 192, 0)' }} />
              </IconButton>
            ) : (
              <IconButton aria-label='Upvote review' size='large' disabled aria-disabled='true'>
                <ArrowCircleUpIcon style={{ color: 'rgb(172, 172, 172)' }} />
              </IconButton>
            )}
            <p className='review-votes' aria-label={`${review.votes.length} upvotes`}>
              {review.meta.votesLength}
            </p>
          </div>
        </div>
      </header>
      <div className='review-comment'>{comment}</div>
    </article>
  );
};

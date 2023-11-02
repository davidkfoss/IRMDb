import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, IconButton, Rating } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Review } from '../../models/review';
import './ReviewCard.css';

interface ReviewProps {
  review: Review;
  onDelete: () => void;
  canDelete: boolean;
}

export const ReviewCard = ({ review, onDelete, canDelete }: ReviewProps) => {
  const { comment, rating, meta, date } = review;

  return (
    <div className='review-container'>
      <div className='review-info'>
        <Rating name='read-only' value={rating} readOnly style={{ color: blue[100] }} />
        <p className='review-date'>{new Date(parseInt(date)).toLocaleDateString()}</p>
        <div className='review-author-info'>
          <Avatar sx={{ width: 28, height: 28 }}>{meta.authorName[0]}</Avatar>
          <p>{meta.authorName}</p>
          {canDelete && (
            <IconButton aria-label='delete' size='small' onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>
      <div className='review-comment'>{comment}</div>
    </div>
  );
};

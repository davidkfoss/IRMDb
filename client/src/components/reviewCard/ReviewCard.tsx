import { Avatar, Rating } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Review } from '../../models/review';
import './ReviewCard.css';

interface ReviewProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewProps) => {
  const { comment, rating, meta, date } = review;

  return (
    <div className='review-container'>
      <div className='review-info'>
        <Rating name='read-only' value={rating} readOnly style={{ color: blue[100] }} />
        <p className='review-date'>{new Date(parseInt(date)).toLocaleDateString()}</p>
        <div className='review-author-info'>
          <Avatar sx={{ width: 28, height: 28 }}>{meta.authorName[0]}</Avatar>
          <p>{meta.authorName}</p>
        </div>
      </div>
      <div className='review-comment'>{comment}</div>
    </div>
  );
};

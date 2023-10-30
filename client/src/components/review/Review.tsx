import { Rating } from '@mui/material';
import { blue } from '@mui/material/colors';
import './Review.css';

interface ReviewProps {
  rating: number;
  comment: string;
  authorEmail: string;
}

export const Review = ({ rating, comment }: ReviewProps) => {
  return (
    <div className='review-container'>
      <Rating name='read-only' value={rating} readOnly style={{ color: blue[100] }} />
      <br />
      <div className='review-comment'>{comment}</div>
    </div>
  );
};

import { Rating } from '@mui/material';
import { blue } from '@mui/material/colors';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import './FeedReview.css';

interface ReviewProps {
  rating: number;
  comment: string;
  authorId: number;
  authorName: string;
  upvotes: number;
}

export const FeedReview = ({ rating, comment, authorName, upvotes }: ReviewProps) => {
  return (
    <div className='review-container'>
      <div className='review-head'>
        <div>
          <Rating name='read-only' value={rating} readOnly style={{ color: blue[100] }} />
          <p className='author'>Author: {authorName}</p>
        </div>
        <div className='upvote'>
          <p className='upvotes'>
            <ArrowCircleUpIcon /> {upvotes}
          </p>
        </div>
      </div>
      <br />
      <div className='review-comment'>{comment}</div>
    </div>
  );
};

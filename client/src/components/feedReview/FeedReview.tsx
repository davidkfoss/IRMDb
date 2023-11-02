import { Rating } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Review } from '../../models/review';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import './FeedReview.css';

export const FeedReview = (review: Review) => {
  return (
    <div className='review-container'>
      <div className='review-head'>
        <div>
          <Rating name='read-only' value={review.rating} readOnly style={{ color: blue[100] }} />
          <p className='author'>Author: {review.meta.authorName}</p>
        </div>
        <div className='upvote'>
          <p className='upvotes'>
            <ArrowCircleUpIcon /> {review.votes.length}
          </p>
        </div>
      </div>
      <br />
      <div className='review-comment'>{review.comment}</div>
    </div>
  );
};

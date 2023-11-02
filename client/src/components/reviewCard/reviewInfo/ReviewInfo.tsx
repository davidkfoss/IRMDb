import { Avatar, Rating } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Review } from '../../../models/review';
import { parseMillisecondsString } from '../../../util/parseDate';
import './ReviewInfo.css';

interface ReviewInfoProps {
  review: Review;
}

export const ReviewInfo = ({ review }: ReviewInfoProps) => {
  const { rating, meta, date } = review;
  return (
    <div>
      <div className='review-author-info'>
        <Avatar sx={{ width: 45, height: 45 }}>{meta.authorName[0]}</Avatar>
        <div className='name-and-time-container'>
          <div>
            <p>{meta.authorName}</p>
            <p className='review-date'>{parseMillisecondsString(date)}</p>
          </div>
          <Rating name='read-only' value={rating} readOnly style={{ color: blue[100] }} />
        </div>
      </div>
    </div>
  );
};

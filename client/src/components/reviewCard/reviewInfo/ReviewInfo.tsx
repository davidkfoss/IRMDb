import { Avatar, Rating } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Review } from '../../../models/review';
import { parseMillisecondsString } from '../../../util/parseDate';
import './ReviewInfo.css';

interface ReviewInfoProps {
  review: Review;
  showTitle?: boolean;
}

export const ReviewInfo = ({ review, showTitle }: ReviewInfoProps) => {
  const { rating, meta, date } = review;
  const navigate = useNavigate();

  const onTitleClick = useCallback(() => {
    navigate(`/movies/${meta.movieId}`);
    window.scrollTo(0, 0);
  }, [meta.movieId, navigate]);

  return (
    <div className='review-info-container'>
      {showTitle && (
        <span className='review-movie-title' onClick={onTitleClick}>
          {meta.movieTitle}
        </span>
      )}
      <div className='review-author-info'>
        <Avatar sx={{ width: 45, height: 45 }}>{meta.authorName[0]}</Avatar>
        <div className='name-and-time-container'>
          <div className='review-info-author'>
            <p>{meta.authorName}</p>
            <p className='review-date'>{parseMillisecondsString(date)}</p>
          </div>
          <Rating name='read-only' value={rating} readOnly style={{ color: blue[100] }} />
        </div>
      </div>
    </div>
  );
};

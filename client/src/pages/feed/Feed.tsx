import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FeedReview } from '../../components/feedReview/FeedReview';
import { Review } from '../../models/review';
import { useAppDispatch } from '../../store/store';
import { getPopularReviews, getRecentReviews } from '../../store/features/reviews/reviewThunks';
import { selectPopularReviews, selectRecentReviews } from '../../store/features/reviews/reviewsSlice';
import './Feed.css';

export const Feed = () => {
  const dispatch = useAppDispatch();
  const [recentReviews, setRecentReviews] = useState([] as Review[]);
  const [popularReviews, setPopularReviews] = useState([] as Review[]);
  const recentReviewsFromStore = useSelector(selectRecentReviews());
  const popularReviewsFromStore = useSelector(selectPopularReviews());

  useEffect(() => {
    const limit = { limit: 3 };
    dispatch(getRecentReviews(limit));
    dispatch(getPopularReviews(limit));
  }, [dispatch]);

  useEffect(() => {
    if (recentReviewsFromStore) {
      setRecentReviews(recentReviewsFromStore);
    }
  }, [recentReviewsFromStore]);

  useEffect(() => {
    if (popularReviewsFromStore) {
      setPopularReviews(popularReviewsFromStore);
    }
  }, [popularReviewsFromStore]);

  return (
    <div className='reviewFeed'>
      <h2>Top reviews</h2>
      {popularReviews && popularReviews.length > 0 ? (
        popularReviews.map((review) => <FeedReview key={review.meta.authorEmail} {...review} />)
      ) : (
        <>No reviews to show</>
      )}
      <h2>Newest reviews</h2>
      {recentReviews && recentReviews.length > 0 ? (
        recentReviews.map((review) => <FeedReview key={review.meta.authorEmail} {...review} />)
      ) : (
        <>No reviews to show</>
      )}
    </div>
  );
};

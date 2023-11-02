import { useSelector } from 'react-redux';
import { FeedReviewCard } from '../../../components/reviewCard/FeedReviewCard';
import { useUser } from '../../../hooks/useUser';
import { Review } from '../../../models/review';
import {
  deleteReviewOnMovie,
  getPopularReviews,
  getRecentReviews,
  addVoteOnReview,
} from '../../../store/features/reviews/reviewThunks';
import { selectPopularReviews, selectRecentReviews } from '../../../store/features/reviews/reviewsSlice';
import { useAppDispatch } from '../../../store/store';
import customToast from '../../../util/toastWrapper';
import { useCallback, useEffect, useState } from 'react';

export const FeedReviewSection = () => {
  const dispatch = useAppDispatch();
  const user = useUser();

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

  const canDelete = useCallback(
    (review: Review) => {
      if (!user) {
        return false;
      }

      return review.meta.authorEmail === user.email;
    },
    [user]
  );

  const onReviewDelete = useCallback(
    (review: Review) => {
      if (!canDelete(review)) return;

      dispatch(deleteReviewOnMovie({ movieId: '', id: review.id }))
        .unwrap()
        .then(() => {
          customToast.success('Review deleted!');
        });
    },
    [dispatch, canDelete]
  );

  const onVote = useCallback(
    (review: Review) => {
      if (!user) {
        customToast.error('You must be logged in to vote');
        return;
      }

      if (review.votes.includes({ vote: true, user: user.email })) {
        customToast.error('You have already voted on this review');
        return;
      }

      dispatch(
        addVoteOnReview({
          vote: true,
          reviewId: review.id,
          authorEmail: user.email,
        })
      )
        .unwrap()
        .then(() => {
          customToast.success('Vote added!');
        });
    },
    [dispatch, user]
  );

  return (
    <>
      <div className='movie-info-reviews'>
        <h2 className='reviews-title'>Popular reviews</h2>
        {popularReviews &&
          popularReviews.map((review) => (
            <FeedReviewCard
              key={review.id}
              review={review}
              onDelete={() => onReviewDelete(review)}
              canDelete={canDelete(review)}
              onVote={() => onVote(review)}
              canVote={!!user && !(review.votes.filter((vote) => vote.user === user.email).length > 0)}
            />
          ))}
      </div>
      <div className='movie-info-reviews'>
        <h2 className='reviews-title'>Recent reviews</h2>
        {recentReviews &&
          recentReviews.map((review) => (
            <FeedReviewCard
              key={review.id}
              review={review}
              onDelete={() => onReviewDelete(review)}
              canDelete={canDelete(review)}
              onVote={() => onVote(review)}
              canVote={!!user && !(review.votes.filter((vote) => vote.user === user.email).length > 0)}
            />
          ))}
      </div>
    </>
  );
};

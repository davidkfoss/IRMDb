import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useReview } from '../../../hooks/useReview';
import { getPopularReviews, getRecentReviews } from '../../../store/features/reviews/reviewThunks';
import {
  selectPopularReviewLoadingStates,
  selectPopularReviews,
  selectRecentReviewLoadingStates,
  selectRecentReviews,
} from '../../../store/features/reviews/reviewsSlice';
import { useAppDispatch } from '../../../store/store';
import customToast from '../../../util/toastWrapper';
import { Reviews } from './Reviews';

/**
 * Renders the feed review section with popular and recent reviews.
 */
export const FeedReviewSection = () => {
  // Set limit for number of reviews to fetch
  const limit = 3;
  const dispatch = useAppDispatch();

  const recentReviews = useSelector(selectRecentReviews());
  const popularReviews = useSelector(selectPopularReviews());

  const {
    pending: popularPending,
    resolved: popularResolved,
    rejected: popularRejected,
  } = useSelector(selectPopularReviewLoadingStates());

  const {
    pending: recentPending,
    resolved: recentResolved,
    rejected: recentRejected,
  } = useSelector(selectRecentReviewLoadingStates());

  // Define function to fetch recent and popular reviews
  const updateReviews = useCallback(() => {
    dispatch(getRecentReviews({ limit: limit }));
    dispatch(getPopularReviews({ limit: limit }));
  }, [dispatch, limit]);

  // Fetch reviews on component mount
  useEffect(() => {
    updateReviews();
  }, [dispatch, limit, updateReviews]);

  // Define functions to handle review deletion and voting
  const onReviewDeleteSuccess = useCallback(() => {
    customToast.success('Review deleted!');
    updateReviews();
  }, [updateReviews]);

  const onVoteSuccess = useCallback(() => {
    customToast.success('Vote added!');
    updateReviews();
  }, [updateReviews]);

  const onDeleteVoteSuccess = useCallback(() => {
    customToast.success('Vote removed!');
    updateReviews();
  }, [updateReviews]);

  const { canDelete, onVote, onDeleteVote, onReviewDelete } = useReview({
    onReviewDeleteSuccess,
    onVoteSuccess,
    onDeleteVoteSuccess,
  });

  return (
    <>
      <section aria-label='Popular reviews' className='movie-info-reviews'>
        <h2 className='reviews-title'>Popular reviews</h2>
        <Reviews
          onReviewDelete={onReviewDelete}
          canDelete={canDelete}
          onVote={onVote}
          onDeleteVote={onDeleteVote}
          reviews={popularReviews}
          pending={popularPending}
          resolved={popularResolved}
          rejected={popularRejected}
          isFeed
        />
      </section>
      <section aria-label='Recent reviews' className='movie-info-reviews'>
        <h2 className='reviews-title'>Recent reviews</h2>
        <Reviews
          onReviewDelete={onReviewDelete}
          canDelete={canDelete}
          onVote={onVote}
          onDeleteVote={onDeleteVote}
          reviews={recentReviews}
          pending={recentPending}
          resolved={recentResolved}
          rejected={recentRejected}
          isFeed
        />
      </section>
    </>
  );
};

import { useCallback } from 'react';
import { Review } from '../models/review';
import { addVoteOnReview, deleteReviewOnMovie, deleteVoteOnReview } from '../store/features/reviews/reviewThunks';
import { useAppDispatch } from '../store/store';
import customToast from '../util/toastWrapper';
import { useUser } from './useUser';

interface UseReviewOptions {
  onReviewDeleteSuccess?: () => void;
  onReviewDeleteError?: () => void;
  onVoteSuccess?: () => void;
  onVoteError?: () => void;
  onDeleteVoteSuccess?: () => void;
  onDeleteVoteError?: () => void;
}

/**
 * A custom hook for managing review-related functionality.
 * @param onReviewDeleteSuccess - A callback function to be executed when a review is successfully deleted.
 * @param onReviewDeleteError - A callback function to be executed when an error occurs while deleting a review.
 * @param onVoteSuccess - A callback function to be executed when a vote is successfully added to a review.
 * @param onVoteError - A callback function to be executed when an error occurs while adding a vote to a review.
 * @param onDeleteVoteSuccess - A callback function to be executed when a vote is successfully deleted from a review.
 * @param onDeleteVoteError - A callback function to be executed when an error occurs while deleting a vote from a review.
 * @returns An object containing functions for deleting a review, adding a vote to a review, deleting a vote from a review, and checking if a review can be deleted.
 */
export const useReview = ({
  onReviewDeleteSuccess,
  onReviewDeleteError,
  onVoteSuccess,
  onVoteError,
  onDeleteVoteSuccess,
  onDeleteVoteError,
}: UseReviewOptions) => {
  const user = useUser(); // Get the current user from the useUser hook
  const dispatch = useAppDispatch(); // Get the dispatch function from the useAppDispatch hook

  /**
   * Check if a review can be deleted by the current user
   * @param review - The review to check
   * @returns True if the review can be deleted by the current user, false otherwise
   */
  const canDelete = useCallback(
    (review: Review) => {
      if (!user) {
        return false;
      }

      return review.meta.authorEmail === user.email;
    },
    [user]
  );

  /**
   * Delete a review
   * @param review - The review to delete
   */
  const onReviewDelete = useCallback(
    (review: Review) => {
      if (!canDelete(review)) return;

      const { meta, id } = review;
      const { movieId } = meta;

      dispatch(deleteReviewOnMovie({ movieId, id })) // Dispatch an action to delete the review
        .unwrap()
        .then(() => {
          onReviewDeleteSuccess?.();
        })
        .catch(() => {
          onReviewDeleteError?.();
        });
    },
    [dispatch, canDelete, onReviewDeleteSuccess, onReviewDeleteError]
  );

  /**
   * Vote on a review
   * @param review - The review to vote on
   */
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
          onVoteSuccess?.();
        })
        .catch(() => {
          onVoteError?.();
        });
    },
    [dispatch, user, onVoteSuccess, onVoteError]
  );

  /**
   * Delete a vote on a review
   * @param review - The review to delete the vote from
   */
  const onDeleteVote = useCallback(
    (review: Review) => {
      if (!user) {
        customToast.error('You must be logged in to vote');
        return;
      }

      if (!(review.votes.filter((vote) => vote.user === user.email).length > 0)) {
        customToast.error('You have not voted on this review');
        return;
      }

      dispatch(
        deleteVoteOnReview({
          reviewId: review.id,
          authorEmail: user.email,
        })
      )
        .unwrap()
        .then(() => {
          onDeleteVoteSuccess?.();
        })
        .catch(() => {
          onDeleteVoteError?.();
        });
    },
    [dispatch, user, onDeleteVoteSuccess, onDeleteVoteError]
  );

  return {
    onReviewDelete,
    onVote,
    onDeleteVote,
    canDelete,
  };
};

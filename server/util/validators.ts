import { ReviewData, Review } from '../types/reviewType';
import { UserData } from '../types/userTypes';

/**
 * Validates user data.
 * @param userData - The user data to validate.
 * @returns True if the user data is valid, false otherwise.
 */
export const validateUserData = (userData: UserData) => {
  if (!userData.name || !userData.email) {
    return false;
  }
  return true;
};

/**
 * Validates the review data.
 * @param reviewData - The review data to be validated.
 * @returns True if the review data is valid, false otherwise.
 */
export const validateReviewData = (reviewData: ReviewData) => {
  if (
    !reviewData.rating ||
    !reviewData.comment ||
    !reviewData.meta.authorEmail ||
    !reviewData.meta.authorName ||
    !reviewData.meta.movieId
  ) {
    return false;
  }
  return true;
};

/**
 * Validates a vote for a review.
 * @param review - The review object.
 * @param authorEmail - The email of the author.
 * @param vote - The vote value (true for upvote, false for downvote).
 * @returns True if the vote is valid, false otherwise.
 */
export const validateVote = (review: Review, authorEmail: string, vote: boolean) => {
  if (!review || !authorEmail || !vote) {
    return false;
  } else if (review.votes.filter((v) => v.user === authorEmail).length > 0) {
    return false;
  }
  return true;
};

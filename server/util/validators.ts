import { ReviewData, Review } from '../types/reviewType';
import { UserData } from '../types/userTypes';

//User validation
export const validateUserData = (userData: UserData) => {
  if (!userData.name || !userData.email || !userData.profilePictureUrl) {
    return false;
  }
  return true;
};

//Review validation
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

export const validateVote = (review: Review, authorEmail: string, vote: boolean) => {
  if (!review || !authorEmail || !vote) {
    return false;
  } else if (review.votes.filter((v) => v.user === authorEmail).length > 0) {
    return false;
  }
  return true;
};

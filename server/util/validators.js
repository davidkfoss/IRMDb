//User validation
export const validateUserData = (userData) => {
  if (!userData.name || !userData.email || !userData.profilePictureUrl) {
    return false;
  } else if (
    typeof userData.name != 'string' ||
    typeof userData.email != 'string' ||
    typeof userData.profilePictureUrl != 'string'
  ) {
    return false;
  }
  return true;
};

//Review validation
export const validateReviewData = (reviewData) => {
  if (
    !reviewData.rating ||
    !reviewData.comment ||
    !reviewData.meta.authorEmail ||
    !reviewData.meta.authorName ||
    !reviewData.meta.movieId
  ) {
    return false;
  } else if (
    typeof reviewData.rating != 'number' ||
    typeof reviewData.comment != 'string' ||
    typeof reviewData.meta.authorEmail != 'string' ||
    typeof reviewData.meta.authorName != 'string' ||
    typeof reviewData.meta.movieId != 'string'
  ) {
    return false;
  }
  return true;
};

export const validateVote = (review, authorEmail, vote) => {
  if (!review || !authorEmail || !vote) {
    return false;
  } else if (typeof review != 'object' || typeof authorEmail != 'string' || typeof vote != 'boolean') {
    return false;
  } else if (review.votes.filter((v) => v.user === authorEmail).length > 0) {
    return false;
  }
  return true;
};

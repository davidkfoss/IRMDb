//User validation
const validateUserData = (userData) => {
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

exports.validateUserData = validateUserData;

//Review validation
const validateReviewData = (reviewData) => {
  if (!reviewData.movieId || !reviewData.rating || !reviewData.comment || !reviewData.author) {
    return false;
  } else if (
    typeof reviewData.movieId != 'string' ||
    typeof reviewData.rating != 'number' ||
    typeof reviewData.comment != 'string' ||
    typeof reviewData.author != 'object'
  ) {
    return false;
  }
  return true;
};

const validateVote = (review, authorId, vote) => {
  if (!review || !authorId || !vote) {
    return false;
  } else if (typeof review != 'object' || typeof authorId != 'string' || typeof vote != 'boolean') {
    return false;
  } else if (review.votes.includes({ user: authorId })) {
    return true;
  }
};

exports.validateReviewData = validateReviewData;
exports.validateVote = validateVote;

const { validateReviewData, validateVote } = require('../util/validators');
const { ReviewModel } = require('../models/Review');
const { MovieModel } = require('../models/Movie');
class ReviewService {
  async getAllReviews() {
    return await ReviewModel.find();
  }

  async getReviewById(id) {
    return await ReviewModel.findById(id);
  }

  async getReviewsByMovieId(movieId) {
    try {
      const reviews = await ReviewModel.find({ 'meta.movieId': movieId });
      return reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error; // or handle it differently depending on your application's error handling strategy
    }
  }

  async getReviewByAuthorAndMovieId(movieId, authorEmail) {
    return await ReviewModel.findOne({ 'meta.movieId': movieId, 'meta.authorEmail': authorEmail });
  }

  async createReview(reviewData) {
    console.log('reviewData', reviewData);
    const user = await UserModel.findOne({ email: reviewData.meta.authorEmail });
    if (!user) {
      return null;
    }
    reviewData.meta.authorName = user.name;
    console.log('reviewData', reviewData);
    if (!validateReviewData(reviewData)) {
      console.log('validateReviewData');
      return null;
    }
    const newReview = await ReviewModel.create(reviewData);
    await MovieModel.findByIdAndUpdate(reviewData.meta.movieId, { $push: { reviewIds: newReview.id } });
    return newReview;
  }

  async voteReview(authorEmail, reviewId, vote) {
    const review = await ReviewModel.findById(reviewId);
    if (!validateReviewData(review)) {
      return null;
    } else if (!validateVote(review, authorEmail, vote)) {
      return null;
    }
    review.votes.push({ vote, user: authorEmail });
    return await ReviewModel.findByIdAndUpdate(reviewId, review, { new: true });
  }

  async updateReview(id, reviewData) {
    if (!validateReviewData(reviewData)) {
      return null;
    }
    return await ReviewModel.findByIdAndUpdate(id, reviewData, { new: true });
  }

  async deleteReview(id) {
    const movie = await ReviewModel.findById(id).select('meta.movieId');
    await MovieModel.findByIdAndUpdate(movie.meta.movieId, { $pull: { reviewIds: id } });
    return await ReviewModel.findByIdAndDelete(id);
  }
}

module.exports.ReviewService = new ReviewService();

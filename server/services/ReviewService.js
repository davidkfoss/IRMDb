const { validateReviewData, validateVote } = require('../util/validators');
const { ReviewModel } = require('../models/Review');
const { MovieService } = require('./MovieService');

class ReviewService {
  async getAllReviews() {
    return await ReviewModel.find();
  }

  async getReviewById(id) {
    return await ReviewModel.findById(id);
  }

  async getReviewsByMovieId(movieId) {
    return ReviewModel.find({ 'meta.movieId': movieId });
  }

  async getReviewByAuthorAndMovieId(movieId, authorId) {
    return await ReviewModel.findOne({ 'meta.movieId': movieId, 'meta.authorId': authorId });
  }

  async createReview(reviewData) {
    if (!validateReviewData(reviewData)) {
      return null;
    }
    const newReview = await ReviewModel.create(reviewData);
    await MovieService.updateMovieRating(newReview.meta.movieId);
    return newReview;
  }

  async voteReview(authourId, reviewId, vote) {
    const review = await ReviewModel.findById(reviewId);
    if (!validateReviewData(review)) {
      return null;
    } else if (!validateVote(review, authourId, vote)) {
      return null;
    }
    review.votes.push += { vote, user: authourId };
    return await review.updateOne(review, { new: true });
  }

  async updateReview(id, reviewData) {
    if (!validateReviewData(reviewData)) {
      return null;
    }
    const updatedReview = await ReviewModel.findByIdAndUpdate(id, reviewData, { new: true });
    await MovieService.updateMovieRating(newReview.meta.movieId);
    return updatedReview;
  }

  async deleteReview(id) {
    const deletedReview = await ReviewModel.findByIdAndDelete(id);
    await MovieService.updateMovieRating(newReview.meta.movieId);
    return deletedReview;
  }
}

module.exports.ReviewService = new ReviewService();

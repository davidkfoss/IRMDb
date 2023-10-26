const { ReviewModel } = require('../models/Review');

class ReviewService {
  async getAllReviews() {
    return await ReviewModel.find();
  }

  async getReviewsByMovieId(movieId) {
    return ReviewModel.find({ movieId: movieId });
  }

  async getReviewByAuthorAndMovieId(movieId, authorId) {
    return await ReviewModel.findOne({ 'movieId': movieId, 'author.id': authorId });
  }

  async getReviewById(id) {
    return await ReviewModel.findById(id);
  }

  async createReview(reviewData) {
    return await ReviewModel.create(reviewData);
  }

  async upvoteReview(id) {
    const review = await ReviewModel.findById(id);
    review.meta.upvotes += 1;
    return await review.save({ new: true });
  }

  async downvoteReview(id) {
    const review = await ReviewModel.findById(id);
    review.meta.downvotes += 1;
    return await review.save({ new: true });
  }

  async updateReview(reviewData) {
    return await ReviewModel.findByIdAndUpdate(reviewData.id, reviewData, { new: true });
  }

  async deleteReview(id) {
    return await ReviewModel.findByIdAndDelete(id);
  }
}

module.exports.ReviewService = new ReviewService();

const { ReviewModel } = require('../models/Review');

class ReviewService {
  async getAllReviews() {
    return await ReviewModel.find();
  }

  async getReviewById(id) {
    return await ReviewModel.findById(id);
  }

  async createReview(reviewData) {
    return await ReviewModel.save(reviewData);
  }

  async updateReview(id, reviewData) {
    return await ReviewModel.findByIdAndUpdate(id, reviewData, { new: true });
  }

  async deleteReview(id) {
    return await ReviewModel.findByIdAndDelete(id);
  }
}

module.exports = ReviewService;

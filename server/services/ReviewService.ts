import { MovieModel } from '../models/Movie';
import { ReviewModel } from '../models/Review';
import { UserModel } from '../models/User';
import { ReviewData } from '../types/reviewType';
import { validateReviewData } from '../util/validators';

class ReviewService {
  async getAllReviews() {
    return await ReviewModel.find();
  }

  async getReviewById(id: string) {
    return await ReviewModel.findById(id);
  }

  async getReviewsByMovieId(movieId: string) {
    try {
      const reviews = await ReviewModel.find({ 'meta.movieId': movieId });
      return reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error; // or handle it differently depending on your application's error handling strategy
    }
  }

  async getReviewByAuthorAndMovieId(movieId: string, authorEmail: string) {
    return await ReviewModel.findOne({ 'meta.movieId': movieId, 'meta.authorEmail': authorEmail });
  }

  async getRecentReviews(limit: number) {
    const reviews = await ReviewModel.find().sort({ date: -1 }).limit(limit);

    await Promise.all(
      reviews.map(async (review) => {
        if (!review.meta || !review.meta.movieId) {
          return;
        }
        const movie = await MovieModel.findById(review.meta.movieId);
        if (!movie || !movie.title) {
          review.meta.movieTitle = 'Movie not found';
        } else {
          review.meta.movieTitle = movie.title;
        }
      })
    );
    return reviews;
  }

  async getPopularReviews(limit: number) {
    const reviews = await ReviewModel.find().sort({ 'meta.votesLength': -1 }).limit(limit);

    await Promise.all(
      reviews.map(async (review) => {
        if (!review.meta || !review.meta.movieId) {
          return;
        }
        const movie = await MovieModel.findById(review.meta.movieId);
        if (!movie || !movie.title) {
          review.meta.movieTitle = 'Movie not found';
        } else {
          review.meta.movieTitle = movie.title;
        }
      })
    );
    return reviews;
  }

  async createReview(reviewData: ReviewData) {
    const user = await UserModel.findOne({ email: reviewData.meta.authorEmail });
    if (!user) {
      return null;
    }
    reviewData.meta.authorName = user.name;
    if (!validateReviewData(reviewData)) {
      return null;
    } else if (await this.getReviewByAuthorAndMovieId(reviewData.meta.movieId, reviewData.meta.authorEmail)) {
      return null;
    }
    const newReview = await ReviewModel.create(reviewData);
    await MovieModel.findByIdAndUpdate(reviewData.meta.movieId, { $push: { reviewIds: newReview.id } });
    return newReview;
  }

  async voteReview(authorEmail: string, reviewId: string, vote: boolean) {
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      return null;
    }
    return await ReviewModel.findByIdAndUpdate(
      reviewId,
      { $push: { votes: { user: authorEmail, vote: vote } }, $inc: { 'meta.votesLength': 1 } },
      { new: true }
    );
  }

  async deleteVoteReview(authorEmail: string, reviewId: string) {
    return await ReviewModel.findByIdAndUpdate(
      reviewId,
      { $pull: { votes: { user: authorEmail } }, $inc: { 'meta.votesLength': -1 } },
      { new: true }
    );
  }

  async updateReview(id: string, reviewData: ReviewData) {
    return await ReviewModel.findByIdAndUpdate(id, reviewData, { new: true });
  }

  async deleteReview(id: string) {
    const movieId = await ReviewModel.findById(id).select('meta.movieId');
    if (!movieId) {
      return null;
    }
    await MovieModel.findByIdAndUpdate(movieId, { $pull: { reviewIds: id } });
    return await ReviewModel.findByIdAndDelete(id);
  }
}

export const reviewService = new ReviewService();

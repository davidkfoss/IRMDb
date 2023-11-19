import { MovieModel } from '../models/Movie';
import { ReviewModel } from '../models/Review';
import { UserModel } from '../models/User';
import { ReviewData } from '../types/reviewType';
import { validateReviewData } from '../util/validators';

/**
 * Service class for managing reviews.
 */
class ReviewService {
  /**
   * Retrieves all reviews from the database.
   * @returns {Promise<Review[]>} A promise that resolves to an array of Review objects.
   */
  async getAllReviews() {
    return await ReviewModel.find();
  }

  /**
   * Retrieves a review by its ID.
   * @param id - The ID of the review.
   * @returns A promise that resolves to the review object.
   */
  async getReviewById(id: string) {
    return await ReviewModel.findById(id);
  }

  /**
   * Retrieves reviews by movie ID.
   * @param movieId - The ID of the movie.
   * @returns A promise that resolves to an array of reviews.
   * @throws If there is an error fetching the reviews.
   */
  async getReviewsByMovieId(movieId: string) {
    try {
      const reviews = await ReviewModel.find({ 'meta.movieId': movieId });
      return reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  /**
   * Retrieves a review by the movie ID and author email.
   * @param {string} movieId - The ID of the movie.
   * @param {string} authorEmail - The email of the author.
   * @returns {Promise<ReviewModel | null>} - The review matching the movie ID and author email, or null if not found.
   */
  async getReviewByAuthorAndMovieId(movieId: string, authorEmail: string) {
    return await ReviewModel.findOne({ 'meta.movieId': movieId, 'meta.authorEmail': authorEmail });
  }

  /**
   * Retrieves the most recent reviews.
   * @param limit The maximum number of reviews to retrieve.
   * @returns A promise that resolves to an array of recent reviews.
   */
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

  /**
   * Retrieves popular reviews.
   * @param limit - The maximum number of reviews to retrieve.
   * @returns An array of popular reviews.
   */
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

  /**
   * Creates a new review.
   * @param reviewData - The data for the review.
   * @returns The newly created review, or null if the user or review data is invalid, or if a review by the same author and movie already exists.
   */
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

  /**
   * Votes on a review.
   * @param authorEmail - The email of the author voting on the review.
   * @param reviewId - The ID of the review.
   * @param vote - The vote value (true for upvote, false for downvote).
   * @returns The updated review object if successful, or null if the review does not exist.
   */
  async voteReview(authorEmail: string, reviewId: string, vote: boolean) {
    const review = await ReviewModel.findOne({
      '_id': reviewId,
      'votes.user': { $nin: [authorEmail] },
    });
    if (!review) {
      return null;
    }
    return await ReviewModel.findByIdAndUpdate(
      reviewId,
      { '$push': { votes: { user: authorEmail, vote: vote } }, 'meta.votesLength': review.votes.length + 1 },
      { new: true }
    );
  }

  /**
   * Deletes a vote from a review.
   * @param authorEmail - The email of the author who voted.
   * @param reviewId - The ID of the review.
   * @returns The updated review after the vote is deleted, or null if the review does not exist.
   */
  async deleteVoteReview(authorEmail: string, reviewId: string) {
    const review = await ReviewModel.findOne({
      '_id': reviewId,
      'votes.user': { $in: [authorEmail] },
    });
    if (!review) {
      return null;
    }

    return await ReviewModel.findByIdAndUpdate(
      reviewId,
      { '$pull': { votes: { user: authorEmail } }, 'meta.votesLength': review.votes.length - 1 },
      { new: true }
    );
  }

  /**
   * Updates a review with the specified ID.
   * @param {string} id - The ID of the review to update.
   * @param {ReviewData} reviewData - The updated review data.
   * @returns {Promise<Review | null>} - A promise that resolves to the updated review, or null if not found.
   */
  async updateReview(id: string, reviewData: ReviewData) {
    return await ReviewModel.findByIdAndUpdate(id, reviewData, { new: true });
  }

  /**
   * Deletes a review by its ID.
   * @param id The ID of the review to delete.
   * @returns The deleted review, or null if the review does not exist.
   */
  async deleteReview(id: string) {
    const review = await ReviewModel.findById(id);

    const movieId = review?.meta?.movieId;

    if (!review || !movieId) {
      return null;
    }

    await MovieModel.findByIdAndUpdate(movieId, { $pull: { reviewIds: id } });
    return await ReviewModel.findByIdAndDelete(id);
  }
}

export const reviewService = new ReviewService();

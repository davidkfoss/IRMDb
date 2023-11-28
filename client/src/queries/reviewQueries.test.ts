import { client } from '../client';
import {
  getAllReviewsQuery,
  getReviewByIdQuery,
  getReviewsByMovieIdQuery,
  getReviewByAuthorAndMovieIdQuery,
  getRecentReviewsQuery,
  getPopularReviewsQuery,
  createReviewMutation,
  deleteReviewMutation,
  voteReviewMutation,
  deleteVoteReviewMutation,
} from './reviewQueries';
import fs from 'fs';

describe('Review Queries', () => {
  it('should fetch all reviews', async () => {
    const { data } = await client.query({
      query: getAllReviewsQuery,
    });

    expect(data.GetAllReviews).toBeDefined();
    expect(data.GetAllReviews.length).toBeGreaterThanOrEqual(0);
    expect(data.GetAllReviews[0].id).toBeDefined();
  });

  it('should fetch a review by ID', async () => {
    const reviewId = '6556146cd189a5606973162a';
    const { data } = await client.query({
      query: getReviewByIdQuery,
      variables: { id: reviewId },
    });

    expect(data.GetReviewById).toBeDefined();
    expect(data.GetReviewById.id).toBe(reviewId);
  });

  it('should fetch reviews by movie ID', async () => {
    const movieId = '653f80332a68d09459a4b660';
    const { data } = await client.query({
      query: getReviewsByMovieIdQuery,
      variables: { movieId },
    });

    expect(data.GetReviewsByMovieId).toBeDefined();
    expect(data.GetReviewsByMovieId[0].meta.movieId).toEqual(movieId);
  });

  it('should fetch a review by author email and movie ID', async () => {
    const authorEmail = 'heihei@hei.hei';
    const movieId = '653f80332a68d09459a4b660';
    const { data } = await client.query({
      query: getReviewByAuthorAndMovieIdQuery,
      variables: { authorEmail, movieId },
    });

    expect(data.GetReviewByAuthorAndMovieId).toBeDefined();
    expect(data.GetReviewByAuthorAndMovieId.meta.authorEmail).toEqual(authorEmail);
  });

  it('should fetch 3 recent reviews in order', async () => {
    const limit = 3;
    const { data } = await client.query({
      query: getRecentReviewsQuery,
      variables: { limit },
    });

    expect(data.GetRecentReviews).toBeDefined();
    expect(data.GetRecentReviews.length).not.toBeGreaterThan(limit);
    expect(Number(data.GetRecentReviews[0].date)).toBeGreaterThanOrEqual(Number(data.GetRecentReviews[1].date));
    expect(Number(data.GetRecentReviews[1].date)).toBeGreaterThanOrEqual(Number(data.GetRecentReviews[2].date));
  });

  it('should fetch popular reviews in order', async () => {
    const limit = 3;
    const { data } = await client.query({
      query: getPopularReviewsQuery,
      variables: { limit },
    });

    expect(data.GetPopularReviews).toBeDefined();
    expect(data.GetPopularReviews[0].votes.length).toBeGreaterThanOrEqual(data.GetPopularReviews[1].votes.length);
    expect(data.GetPopularReviews[1].votes.length).toBeGreaterThanOrEqual(data.GetPopularReviews[2].votes.length);
  });

  it('Should create a review', async () => {
    const rating = 5;
    const comment = 'This is a test comment';
    const authorEmail = 'ufkefu@ce.om';
    const movieId = '653f802e2a68d09459a496e9';
    await client
      .mutate({
        mutation: createReviewMutation,
        variables: { rating, comment, authorEmail, movieId },
      })
      .then(async () => {
        const result = await client.query({
          query: getReviewByAuthorAndMovieIdQuery,
          variables: { authorEmail, movieId },
        });
        expect(result).toBeDefined();
        expect(result.data.GetReviewByAuthorAndMovieId.id).toBeDefined();
        expect(result.data.GetReviewByAuthorAndMovieId.meta.authorEmail).toBe(authorEmail);
        expect(result.data.GetReviewByAuthorAndMovieId.meta.movieId).toBe(movieId);
        return result.data.GetReviewByAuthorAndMovieId.id;
      })
      .then(async (result) => {
        const reviewId = result;
        // Write the review ID to a file so that it can be deleted later
        fs.writeFileSync('./src/test/util/reviewId.txt', reviewId);
      });
  });

  it('Should delete a review', async () => {
    // Read the review ID from the file
    const reviewId = await fs.readFileSync('./src/test/util/reviewId.txt', 'utf8');
    await client
      .mutate({
        mutation: deleteReviewMutation,
        variables: { id: reviewId },
      })
      .then(async () => {
        const { data } = await client.query({
          query: getReviewByIdQuery,
          variables: { id: reviewId },
        });
        expect(data).toBeDefined();
        expect(data.GetReviewById?.id).toBeUndefined();
      });
  });

  it('Adds vote to review', async () => {
    const addVote = voteReviewMutation;
    const authorEmail = 'ufkefu@ce.om';
    const reviewId = '65573e820ca1ff98d1f24c5a';
    const vote = true;
    await client
      .mutate({
        mutation: addVote,
        variables: { authorEmail, reviewId, vote },
      })
      .then(async () => {
        const { data } = await client.query({
          query: getReviewByIdQuery,
          variables: { id: reviewId },
        });
        expect(data).toBeDefined();
        expect(data.GetReviewById?.votes[0].user).toBe(authorEmail);
      });
  });

  it('Deletes vote from review', async () => {
    const deleteVote = deleteVoteReviewMutation;
    const authorEmail = 'ufkefu@ce.om';
    const reviewId = '65573e820ca1ff98d1f24c5a';
    await client
      .mutate({
        mutation: deleteVote,
        variables: { authorEmail, reviewId },
      })
      .then(async () => {
        const { data } = await client.query({
          query: getReviewByIdQuery,
          variables: { id: reviewId },
        });
        expect(data).toBeDefined();
        expect(data.GetReviewById?.votes.length).toBe(0);
      });
  });
});

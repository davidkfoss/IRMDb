import { gql } from '@apollo/client';

const getAllReviewsQuery = gql`
  {
    GetAllReviews {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorEmail
        authorName
        movieId
      }
    }
  }
`;

const getReviewByIdQuery = gql`
  query ($id: ID!) {
    GetReviewById(id: $id) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorEmail
        authorName
        movieId
      }
    }
  }
`;

const getReviewsByMovieIdQuery = gql`
  query ($movieId: ID!) {
    GetReviewsByMovieId(movieId: $movieId) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorEmail
        authorName
        movieId
      }
    }
  }
`;

const getReviewByAuthorAndMovieIdQuery = gql`
  query ($movieId: ID!, $authorEmail: String!) {
    GetReviewByAuthorAndMovieId(movieId: $movieId, authorEmail: $authorEmail) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorEmail
        authorName
        movieId
      }
    }
  }
`;

const getRecentReviewsQuery = gql`
  query ($limit: Int!) {
    GetRecentReviews(limit: $limit) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorEmail
        authorName
        movieId
      }
    }
  }
`;

const getPopularReviewsQuery = gql`
  query ($limit: Int!) {
    GetPopularReviews(limit: $limit) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorEmail
        authorName
        movieId
      }
    }
  }
`;

const createReviewMutation = gql`
  mutation ($rating: Int!, $comment: String!, $authorEmail: String!, $movieId: ID!) {
    CreateReview(rating: $rating, comment: $comment, authorEmail: $authorEmail, movieId: $movieId) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorEmail
        authorName
        movieId
      }
    }
  }
`;

const voteReviewMutation = gql`
  mutation ($authorEmail: String!, $reviewId: ID!, $vote: Boolean!) {
    VoteReview(authorEmail: $authorEmail, reviewId: $reviewId, vote: $vote) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorEmail
        authorName
        movieId
      }
    }
  }
`;

const deleteReviewMutation = gql`
  mutation ($id: ID!) {
    DeleteReview(id: $id) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorEmail
        authorName
        movieId
      }
    }
  }
`;

export {
  createReviewMutation,
  deleteReviewMutation,
  getAllReviewsQuery,
  getReviewByAuthorAndMovieIdQuery,
  getReviewByIdQuery,
  getReviewsByMovieIdQuery,
  voteReviewMutation,
  getRecentReviewsQuery,
  getPopularReviewsQuery,
};

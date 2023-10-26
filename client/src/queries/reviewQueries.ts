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
        authorId
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
        authorId
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
        authorId
        authorName
        movieId
      }
    }
  }
`;

const getReviewByAuthorAndMovieIdQuery = gql`
  query ($movieId: ID!, $authorId: ID!) {
    GetReviewByAuthorAndMovieId(movieId: $movieId, authorId: $authorId) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorId
        authorName
        movieId
      }
    }
  }
`;

const createReviewMutation = gql`
  mutation ($rating: Int!, $comment: String!, $authorId: ID!, $authorName: String!, $movieId: ID!) {
    CreateReview(rating: $rating, comment: $comment, authorId: $authorId, authorName: $authorName, movieId: $movieId) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorId
        authorName
        movieId
      }
    }
  }
`;

const voteReviewMutation = gql`
  mutation ($authorId: ID!, $reviewId: ID!, $vote: Boolean!) {
    VoteReview(authorId: $authorId, reviewId: $reviewId, vote: $vote) {
      id
      rating
      comment
      votes {
        vote
        user
      }
      date
      meta {
        authorId
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
        authorId
        authorName
        movieId
      }
    }
  }
`;

export {
  getAllReviewsQuery,
  getReviewByIdQuery,
  getReviewsByMovieIdQuery,
  getReviewByAuthorAndMovieIdQuery,
  createReviewMutation,
  voteReviewMutation,
  deleteReviewMutation,
};

import { gql } from '@apollo/client';

const getMovieByIdQuery = gql`
  query ($id: ID!) {
    GetMovieById(id: $id) {
      id
      title
      genre
      releaseDate
      posterUrl
      overview
      popularity
      rating
      reviews
    }
  }
`;

const getAllMoviesQuery = gql`
  {
    GetAllMovies {
      id
      title
      genre
      releaseDate
      posterUrl
      overview
      popularity
      rating
      reviews
    }
  }
`;

const getMoviesByFilterQuery = gql`
  query ($genre: [String], $sortBy: String, $direction: String, $search: String) {
    GetMoviesByFilter(genre: $genre, sortBy: $sortBy, direction: $direction, search: $search) {
      id
      title
      genre
      releaseDate
      posterUrl
      overview
      popularity
      rating
      reviews
    }
  }
`;

export { getMovieByIdQuery, getAllMoviesQuery, getMoviesByFilterQuery };

import {gql} from '@apollo/client';

const getMoviesQuery = gql`
    {
        movies {
            id
            title
            releaseDate
            posterUrl
        }
    }
`;

const getMovieQuery = gql`
    query($id:ID!){
        movie(id:$id){
            id
		    title
            genre
            releaseDate
            posterUrl
            overview
            popularity
            rating
            reviews{
                rating
                comment
                author{
                    id
                    email
                    profilePictureUrl
                }
            }
        }
    }
`;

const getFilteredMoviesQuery = gql`
    query($genre: [String], $sortBy:String, $direction:String, $search:String){
        moviesWithFilter(genre:$genre, sortBy:$sortBy, direction:$direction, search:$search){
            id
		    title
            releaseDate
            posterUrl
        }
    }
`;

const getReviewsOnMovieQuery = gql`
    query($movieId:ID!){
        reviews(movieId: $movieId) {
            rating
            comment
            author {
                email
                profilePictureUrl
            }
        }
    }
`;

const addReviewOnMovieQuery = gql`
    mutation($movieId:ID!, $rating:Int!, $comment:String!, $authorId:ID!){
        addReviewOnMovie(movieId:$movieId, rating:$rating, comment:$comment, authorId:$authorId){
            rating
            comment
            author{
                email
                profilePictureUrl
            }
        }
    }
`;

const deleteReviewOnMovieQuery = gql`
    mutation($movieId:ID!, $authorId:ID!){
        deleteReviewOnMovie(movieId:$movieId, authorId:$authorId)
    }
`;

export {getMoviesQuery, getMovieQuery, getFilteredMoviesQuery, getReviewsOnMovieQuery, addReviewOnMovieQuery, deleteReviewOnMovieQuery};
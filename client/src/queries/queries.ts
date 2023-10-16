import {gql} from '@apollo/client';

const getMoviesQuery = gql`
    {
        movies {
            id
            title
            genre
            releaseDate
            posterUrl
            overview
            popularity

        }
    }
    `;

const getMovieQuery = gql`
    query($id: ID) {
        movie(id: $id) {
            id
            title
            genre
            releaseDate
            posterUrl
            overview
            popularity
        }
    }`


export {getMoviesQuery, getMovieQuery};
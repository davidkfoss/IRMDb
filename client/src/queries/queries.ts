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


export {getMoviesQuery, getMovieQuery, getFilteredMoviesQuery};
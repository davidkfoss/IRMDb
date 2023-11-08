import fs from 'fs';
import data from './json.json' assert { type: 'json' };

const movies = data;

const formattedMovies = movies
  .map((movie) => {
    return {
      title: movie.Title,
      genre: movie.Genre.split(', '),
      releaseDate: movie.Release_Date,
      posterUrl: movie.Poster_Url,
      overview: movie.Overview,
      popularity: movie.Popularity,
    };
  })
  .filter((movie) => movie.title && movie.releaseDate && movie.posterUrl && movie.overview);

fs.writeFile('movies.json', JSON.stringify(formattedMovies, null, 2), function (err) {
  if (err) {
    console.log(err);
  }
});

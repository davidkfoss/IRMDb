import data from './json.json' assert { type: 'json' };

const movies = data;

const formattedMovies = movies.map((movie, i) => {
  return {
    id: i + 1,
    title: movie.Title,
    genre: movie.Genre.split(', '),
    releaseDate: movie.Release_Date,
    posterUrl: movie.Poster_Url,
    overview: movie.Overview,
    popularity: movie.Popularity,
  };
});

console.log(formattedMovies);

// fs.writeFile('movies.json', JSON.stringify(formattedMovies, null, 2), function (err) {
//   if (err) {
//     console.log(err);
//   }
// });

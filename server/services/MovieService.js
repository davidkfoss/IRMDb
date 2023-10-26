const { MovieModel } = require('../models/Movie');

class MovieService {
  async getAllMovies() {
    return await MovieModel.find();
  }

  async getMovieById(id) {
    return await MovieModel.findById(id);
  }

  async updateMovieRating(id) {
    const movie = MovieModel.findById(id);
    if (!movie.reviews) {
      movie.reviews = [];
      movie.rating = args.rating;
    } else {
      movie.rating = (movie.rating * movie.reviews.length + args.rating) / (movie.reviews.length + 1);
    }
    return await movie.findByIdAndUpdate(movie.id, movie, { new: true });
  }
}

module.exports.MovieService = new MovieService();

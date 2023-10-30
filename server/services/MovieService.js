const { MovieModel } = require('../models/Movie');

class MovieService {
  async getAllMovies() {
    return await MovieModel.find();
  }

  async getMovieById(id) {
    return await MovieModel.findById(id);
  }

  async updateMovieRating(id, reviews) {
    const movie = await MovieModel.findById(id);
    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });
    movie.rating = totalRating / reviews.length;
    return await MovieModel.updateOne(movie);
  }
}

module.exports.MovieService = new MovieService();

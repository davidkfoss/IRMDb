const { mongoose } = require('mongoose');
const { MovieModel } = require('../models/Movie');

class MovieService {
  async getAllMovies() {
    return await MovieModel.find();
  }

  async getMovieById(id) {
    return await MovieModel.findById(id);
  }

  async createMovie(movieData) {
    return await MovieModel.create(movieData);
  }

  async updateMovie(id, movieData) {
    return await MovieModel.findByIdAndUpdate(id, movieData, { new: true });
  }

  async deleteMovie(id) {
    return await MovieModel.findByIdAndDelete(id);
  }
}

module.exports.MovieService = new MovieService();

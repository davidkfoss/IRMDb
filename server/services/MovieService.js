const { MovieModel } = require('../models/Movie');

class MovieService {
  async getAllMovies(offset, limit, search, genres, sortBy, direction) {
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genres && genres.length > 0) {
      query.genre = { $all: genres };
    }
    const sortQuery = {};
    if (sortBy === 'Name') {
      sortQuery.title = direction === 'asc' ? 1 : -1;
    } else if (sortBy === 'Rating') {
      sortQuery.rating = direction === 'asc' ? 1 : -1;
    } else if (sortBy === 'Release Date') {
      sortQuery.releaseDate = direction === 'asc' ? 1 : -1;
    } else {
      sortQuery.popularity = direction === 'asc' ? 1 : -1;
    }
    return await MovieModel.find(query).sort(sortQuery).skip(offset).limit(limit);
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

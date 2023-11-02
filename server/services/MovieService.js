import { MovieModel } from '../models/Movie.js';

export class MovieService {
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
    const movie = await MovieModel.findById(id);
    if (!movie.rating) {
      movie.rating = 0;
    }
    return movie;
  }

  async updateMovieRating(id, reviews) {
    const movie = await MovieModel.findById(id);
    if (reviews.length === 0) {
      movie.rating = 0;
      await movie.save();
      return;
    }
    movie.rating = 0;
    reviews.forEach((review) => {
      movie.rating += review.rating;
    });
    movie.rating = movie.rating / reviews.length;
    await movie.save();
  }
}

export const movieService = new MovieService();

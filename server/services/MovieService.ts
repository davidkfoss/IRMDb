import { MovieModel } from '../models/Movie';
import { QueryMoviesData, QuerySortMoviesData } from '../types/movireTypes';
import { Review } from '../types/reviewType';

export class MovieService {
  async getAllMovies(offset: number, limit: number, search: string, genres: string, sortBy: string, direction: string) {
    console.log('getAllMovies', offset, limit, search, genres, sortBy, direction);

    const query: QueryMoviesData = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genres && genres.length > 0) {
      query.genre = { $all: genres };
    }
    if (sortBy === 'Rating') {
      query.rating = { $ne: undefined };
    }

    const sortQuery: Record<string, number> = {};
    if (sortBy === 'Name') {
      sortQuery.title = direction === 'asc' ? 1 : -1;
    } else if (sortBy === 'Rating') {
      sortQuery.rating = direction === 'asc' ? 1 : -1;
    } else if (sortBy === 'Release Date') {
      sortQuery.releaseDate = direction === 'asc' ? 1 : -1;
    } else {
      sortQuery.popularity = direction === 'asc' ? 1 : -1;
    }
    sortQuery._id = 1;

    return await MovieModel.find(query)
      .sort(sortQuery as any)
      .skip(offset)
      .limit(limit);
  }

  async getMovieById(id: string) {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      throw new Error('Movie not found');
    } else if (!movie.rating) {
      movie.rating = 0;
    }
    return movie;
  }

  async updateMovieRating(id: string, reviews: Review[]) {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    if (reviews.length === 0) {
      movie.rating = undefined;
      await movie.save();
      return;
    }
    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });
    movie.rating = totalRating / reviews.length;
    await movie.save();
  }
}

export const movieService = new MovieService();

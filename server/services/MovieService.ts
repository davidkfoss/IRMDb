import { MovieModel } from '../models/Movie';
import { QueryMoviesData } from '../types/movireTypes';
import { Review } from '../types/reviewType';

/**
 * Service class for managing movies.
 */
export class MovieService {
  /**
   * Retrieves a list of movies based on the provided parameters.
   * @param offset - The number of movies to skip.
   * @param limit - The maximum number of movies to retrieve.
   * @param search - The search string to filter movies by title.
   * @param genres - An array of genres to filter movies by.
   * @param sortBy - The field to sort the movies by.
   * @param direction - The sort direction ('asc' or 'desc').
   * @returns A Promise that resolves to an array of movies.
   */
  async getAllMovies(offset: number, limit: number, search: string, genres: string, sortBy: string, direction: string) {
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

  /**
   * Retrieves a movie by its ID.
   * @param id - The ID of the movie to retrieve.
   * @returns A Promise that resolves to the movie object.
   * @throws Error if the movie is not found.
   */
  async getMovieById(id: string) {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      throw new Error('Movie not found');
    } else if (!movie.rating) {
      movie.rating = 0;
    }
    return movie;
  }

  /**
   * Updates the rating of a movie based on the provided reviews.
   * @param id - The ID of the movie to update.
   * @param reviews - An array of review objects containing the ratings.
   * @returns A Promise that resolves when the movie rating is updated.
   * @throws Error if the movie is not found.
   */
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

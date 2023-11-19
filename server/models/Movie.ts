import mongoose from 'mongoose';

const MovieGenres = [
  'Action',
  'Adventure',
  'Romance',
  'Documentary',
  'Fantasy',
  'Family',
  'Animation',
  'Comedy',
  'Drama',
  'Science Fiction',
  'History',
  'War',
  'Music',
  'Horror',
  'Thriller',
  'Mystery',
  'Crime',
  'TV Movie',
  'Western',
];

/**
 * Represents a movie in the database.
 */
const MovieSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  genre: [{ type: String, enum: MovieGenres }],
  releaseDate: { type: String, required: true },
  posterUrl: { type: String, required: true },
  overview: { type: String, required: true },
  popularity: Number,
  rating: Number,
  reviewIds: [{ type: String }],
});

export const MovieModel = mongoose.model('Movie', MovieSchema, 'movies');

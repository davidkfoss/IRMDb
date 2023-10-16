import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: String,
  genre: [String],
  releaseDate: String,
  posterUrl: String,
  overview: String,
  popularity: Number,
});

export const Movie = mongoose.model<typeof MovieSchema & mongoose.Document>('Movie', MovieSchema);

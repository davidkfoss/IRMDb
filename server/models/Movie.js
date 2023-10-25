const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  genre: [String],
  releaseDate: String,
  posterUrl: String,
  overview: String,
  popularity: Number,
  rating: Number,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

exports.MovieModel = mongoose.model('Movie', MovieSchema, 'movies');

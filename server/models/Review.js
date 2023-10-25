const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  movieId: String,
  rating: Number,
  comment: String,
  author: { id: String, name: String, email: String },
  date: { type: Date, default: Date.now },
  meta: {
    upvotes: Number,
    downvotes: Number,
  },
});

exports.ReviewModel = mongoose.model('Review', ReviewSchema, 'reviews');

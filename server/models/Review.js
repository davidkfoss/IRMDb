const mongoose = require('mongoose');

const Vote = {
  vote: { type: Boolean, required: true },
  user: { type: String, required: true },
};

const ReviewMeta = {
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  movieId: { type: String, required: true },
};

const ReviewSchema = new mongoose.Schema({
  rating: Number,
  comment: { type: String, required: true },
  votes: [{ type: Vote, unique: true }],
  date: { type: Date, default: Date.now },
  meta: { type: ReviewMeta, unique: true },
});

exports.ReviewModel = mongoose.model('Review', ReviewSchema);

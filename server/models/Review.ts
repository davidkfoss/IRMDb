import mongoose from 'mongoose';

const Vote = {
  vote: { type: Boolean, required: true },
  user: { type: String, required: true },
};

const ReviewMeta = {
  authorEmail: { type: String, required: true },
  authorName: { type: String, required: true },
  movieId: { type: String, required: true },
  movieTitle: { type: String },
};

const ReviewSchema = new mongoose.Schema({
  rating: Number,
  comment: { type: String, required: true },
  votes: [{ type: Vote }],
  date: { type: Date, default: Date.now },
  meta: { type: ReviewMeta, unique: true },
});

export const ReviewModel = mongoose.model('Review', ReviewSchema);

import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  author: String,
  reviewText: String,
  rating: Number,
  date: { type: Date, default: Date.now },
  meta: {
    upvotes: Number,
  },
});

export const Review = mongoose.model<typeof ReviewSchema & mongoose.Document>('Review', ReviewSchema);

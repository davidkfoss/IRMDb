import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  profilePictureUrl: String,
  role: {
    type: String,
    enum: ['admin', 'moderator', 'user'],
    default: 'user',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model('User', UserSchema);

export const genres = [
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
] as const;

export type Genre = (typeof genres)[number];

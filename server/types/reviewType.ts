export interface Review {
  id: string;
  rating: number;
  comment: string;
  votes: Vote[];
  date: string;
  meta: ReviewMeta;
}

export interface ReviewMeta {
  authorEmail: string;
  authorName?: string;
  movieId: string;
  movieTitle?: string;
}

export interface Vote {
  vote: boolean;
  user: string;
}

export interface ReviewData {
  rating: number;
  comment: string;
  meta: ReviewMeta;
}

export interface QueryReviewArgs {
  id: string;
  movieId: string;
  authorEmail: string;
  limit: number;
}

export interface MutateCreateReviewData {
  rating: number;
  comment: string;
  authorEmail: string;
  movieId: string;
}

export interface MutateVoteReviewData {
  reviewId: string;
  vote: boolean;
  authorEmail: string;
}

export interface MutateDeleteVoteReviewData {
  reviewId: string;
  authorEmail: string;
}

export interface MutateDeleteReviewData {
  id: string;
}

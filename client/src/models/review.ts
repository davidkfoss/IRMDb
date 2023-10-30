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
  authorName: string;
  movieId: string;
}

export interface Vote {
  vote: boolean;
  user: string;
}

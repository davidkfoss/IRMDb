/**
 * Represents a review object.
 */
export interface Review {
  id: string;
  rating: number;
  comment: string;
  votes: Vote[];
  date: string;
  meta: ReviewMeta;
}

/**
 * Interface representing metadata for a movie review.
 */
export interface ReviewMeta {
  authorEmail: string;
  authorName: string;
  movieId: string;
  movieTitle: string;
  votesLength: number;
}

/**
 * Represents a vote on a review.
 */
export interface Vote {
  /**
   * The value of the vote. `true` for an upvote, `false` for a downvote.
   */
  vote: boolean;
  /**
   * The email of the user who cast the vote.
   */
  user: string;
}

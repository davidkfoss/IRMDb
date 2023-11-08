import { ClipLoader } from 'react-spinners';
import { ReviewCard } from '../../../components/reviewCard/ReviewCard';
import { useUser } from '../../../hooks/useUser';
import { Review } from '../../../models/review';

interface FeedReviewsProps {
  canDelete: (review: Review) => boolean;
  onVote: (review: Review) => void;
  onDeleteVote: (review: Review) => void;
  onReviewDelete: (review: Review) => void;
  reviews: Review[];
  resolved: boolean;
  pending: boolean;
  rejected: boolean;
}

export const FeedReviews = ({
  onReviewDelete,
  canDelete,
  onVote,
  onDeleteVote,
  resolved,
  pending,
  rejected,
  reviews,
}: FeedReviewsProps) => {
  const user = useUser();
  if (pending && reviews && reviews.length === 0) {
    return <ClipLoader size={128} color='#1be3e3' cssOverride={{ marginTop: '2rem' }} />;
  }

  if (rejected || !reviews) {
    return <div>Failed to load reviews, please try again ...</div>;
  }

  if (resolved && reviews && reviews.length === 0) {
    return <div>No reviews</div>;
  }

  return (
    <>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onDelete={() => onReviewDelete(review)}
          canDelete={canDelete(review)}
          onVote={() => onVote(review)}
          canVote={user != null && review.votes.every((vote) => vote.user !== user.email)}
          onDeleteVote={() => onDeleteVote(review)}
          isLoggedIn={user != null}
          isFeed={true}
        />
      ))}
    </>
  );
};

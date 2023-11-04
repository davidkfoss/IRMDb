import './Feed.css';
import { FeedReviewSection } from './reviewSection/FeedReviewSection';

export const Feed = () => {
  return (
    <main className='reviewFeed' role='main' aria-label='Feed'>
      <FeedReviewSection />
    </main>
  );
};

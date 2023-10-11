import { FeedReview } from '../../components/feedReview/FeedReview';
import './Feed.css';

export const Feed = () => {
  const loremImpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae quam eget nunc aliquam aliquet. Sed euismod, nisl eget aliquam aliquet, nisl nisl aliquam nisl, ne';
  const mockReviews = [
    {
      authorId: 1,
      authorName: 'John Doe',
      rating: 5,
      comment: loremImpsum,
      date: new Date('2020-09-30T14:48:00.000Z'),
      upvotes: 5,
    },
    {
      authorId: 2,
      authorName: 'Jane Doe',
      rating: 4,
      comment: loremImpsum,
      date: new Date('2021-09-30T14:48:00.000Z'),
      upvotes: 3,
    },
    {
      authorId: 3,
      authorName: 'John Smith',
      rating: 3,
      comment: loremImpsum,
      date: new Date('2000-09-30T14:48:00.000Z'),
      upvotes: 1,
    },
  ];

  return (
    <div className='reviewFeed'>
      <h2>Top reviews</h2>
      {mockReviews
        .sort((a, b) => {
          return b.upvotes - a.upvotes;
        })
        .map((review) => {
          return <FeedReview key={review.authorId} {...review} />;
        })}
      <h2>Newest reviews</h2>
      {mockReviews
        .sort((a, b) => {
          return b.date.getTime() - a.date.getTime();
        })
        .map((review) => {
          return <FeedReview key={review.authorId} {...review} />;
        })}
    </div>
  );
};

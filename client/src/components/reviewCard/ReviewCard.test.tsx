import { render, screen, fireEvent } from '@testing-library/react';
import { ReviewCard } from './ReviewCard';
import { Review } from '../../models/review';

const mockReview: Review = {
  id: '1',
  rating: 4,
  comment: 'This is a test review',
  votes: [
    {
      vote: true,
      user: 'user1@example.com',
    },
    {
      vote: false,
      user: 'user2@example.com',
    },
  ],
  date: '2022-01-01',
  meta: {
    authorEmail: 'author@example.com',
    authorName: 'John Doe',
    movieId: '123',
    movieTitle: 'Test Movie',
    votesLength: 2,
  },
};

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));

describe('ReviewCard', () => {
  it('renders the review comment', () => {
    render(
      <ReviewCard
        review={mockReview}
        onDelete={() => {}}
        canDelete={false}
        onVote={() => {}}
        onDeleteVote={() => {}}
        canVote={false}
        isLoggedIn={false}
        isFeed={false}
      />
    );
    const commentElement = screen.getByText('This is a test review');
    expect(commentElement).toBeVisible();
  });

  it('renders the review title when isFeed is true', () => {
    render(
      <ReviewCard
        review={mockReview}
        onDelete={() => {}}
        canDelete={false}
        onVote={() => {}}
        onDeleteVote={() => {}}
        canVote={false}
        isLoggedIn={false}
        isFeed={true}
      />
    );
    const titleElement = screen.getByText('This is a test review');
    expect(titleElement).toBeVisible();
  });

  it('renders the review author name', () => {
    render(
      <ReviewCard
        review={mockReview}
        onDelete={() => {}}
        canDelete={false}
        onVote={() => {}}
        onDeleteVote={() => {}}
        canVote={false}
        isLoggedIn={false}
        isFeed={false}
      />
    );
    const authorElement = screen.getByText('John Doe');
    expect(authorElement).toBeVisible();
  });

  it('renders the review upvotes count', () => {
    render(
      <ReviewCard
        review={mockReview}
        onDelete={() => {}}
        canDelete={false}
        onVote={() => {}}
        onDeleteVote={() => {}}
        canVote={false}
        isLoggedIn={false}
        isFeed={false}
      />
    );
    const upvotesElement = screen.getByLabelText('2 upvotes');
    expect(upvotesElement).toBeVisible();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDeleteMock = vi.fn();
    render(
      <ReviewCard
        review={mockReview}
        onDelete={onDeleteMock}
        canDelete={true}
        onVote={() => {}}
        onDeleteVote={() => {}}
        canVote={false}
        isLoggedIn={false}
        isFeed={false}
      />
    );
    const deleteButton = screen.getByLabelText('Delete review');
    fireEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalled();
  });

  it('calls onVote when upvote button is clicked', () => {
    const onVoteMock = vi.fn();
    render(
      <ReviewCard
        review={mockReview}
        onDelete={() => {}}
        canDelete={false}
        onVote={onVoteMock}
        onDeleteVote={() => {}}
        canVote={true}
        isLoggedIn={false}
        isFeed={false}
      />
    );
    const upvoteButton = screen.getByLabelText('Upvote review');
    fireEvent.click(upvoteButton);
    expect(onVoteMock).toHaveBeenCalled();
  });

  it('calls onDeleteVote when remove upvote button is clicked', () => {
    const onDeleteVoteMock = vi.fn();
    render(
      <ReviewCard
        review={mockReview}
        onDelete={() => {}}
        canDelete={false}
        onVote={() => {}}
        onDeleteVote={onDeleteVoteMock}
        canVote={false}
        isLoggedIn={true}
        isFeed={false}
      />
    );
    const removeUpvoteButton = screen.getByLabelText('Remove upvote from review');
    fireEvent.click(removeUpvoteButton);
    expect(onDeleteVoteMock).toHaveBeenCalled();
  });
});

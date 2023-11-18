import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { FeedReviewSection } from './FeedReviewSection';
import configureStore from 'redux-mock-store';
import { mockState } from '../../../test/util/mockState';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

vi.mock('react', async () => {
  const actual: any = await vi.importActual('react');
  return {
    ...actual,
    useCallback: () => vi.fn(),
    useEffect: () => vi.fn(),
  };
});

describe('FeedReviewSection', () => {
  const store = mockStore(mockState);
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FeedReviewSection />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render the popular reviews section', () => {
    const popularReviewsSection = screen.getByTestId('popular-reviews-section');
    expect(popularReviewsSection).toBeVisible();
  });

  it('should render the recent reviews section', () => {
    const recentReviewsSection = screen.getByTestId('recent-reviews-section');
    expect(recentReviewsSection).toBeVisible();
  });

  it('should render the reviews in each section', () => {
    const reviews = screen.getAllByTestId('review-card');
    expect(reviews.length).toBe(mockState.reviews.popularReviews.length + mockState.reviews.recentReviews.length);
  });

  it('should have the correct number of upvotes in total', () => {
    const upvoteElements = screen.getAllByTestId('upvotes');
    const sumUpvotes = upvoteElements.reduce((acc, upvote) => acc + Number(upvote.textContent), 0);
    const totalUpvotes =
      mockState.reviews.popularReviews.reduce((acc, review) => acc + review.votes.length, 0) +
      mockState.reviews.recentReviews.reduce((acc, review) => acc + review.votes.length, 0);
    expect(sumUpvotes).toBe(totalUpvotes);
  });
});

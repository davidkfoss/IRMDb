import { render, screen } from '@testing-library/react';
import { ReviewInfo } from './ReviewInfo';
import { mockState } from '../../../test/util/mockState';

const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('ReviewInfo', () => {
  const review = mockState.reviews.popularReviews[0];

  it('renders the movie title when showTitle is true', () => {
    render(<ReviewInfo review={review} showTitle={true} />);
    const movieTitleElement = screen.getByText(review.meta.movieTitle);
    expect(movieTitleElement).toBeVisible();
  });

  it('does not render the movie title when showTitle is false', () => {
    render(<ReviewInfo review={review} showTitle={false} />);
    const movieTitleElement = screen.queryByText(review.meta.movieTitle);
    expect(movieTitleElement).toBeNull();
  });

  it('renders the author name and review date', () => {
    render(<ReviewInfo review={review} showTitle={true} />);
    const authorNameElement = screen.getByText(review.meta.authorName);
    expect(authorNameElement).toBeVisible();
  });

  it('renders the rating with the correct value', () => {
    render(<ReviewInfo review={review} showTitle={true} />);
    const ratingElement = screen.getByLabelText(`Rating: ${review.rating} out of 5`);
    expect(ratingElement).toBeVisible();
  });
});

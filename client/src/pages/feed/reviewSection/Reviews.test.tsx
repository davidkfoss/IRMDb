import { fireEvent, render, screen } from '@testing-library/react';
import { Reviews } from './Reviews';
import { mockState } from '../../../test/util/mockState';
import { MemoryRouter } from 'react-router-dom';

describe('Reviews', () => {
  const mockReviews = mockState.reviews.popularReviews;

  const mockOnReviewDelete = vi.fn();
  const mockCanDelete = () => true;
  const mockOnVote = vi.fn();
  const mockOnDeleteVote = vi.fn();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Reviews
          onReviewDelete={mockOnReviewDelete}
          canDelete={mockCanDelete}
          onVote={mockOnVote}
          onDeleteVote={mockOnDeleteVote}
          resolved={true}
          pending={false}
          rejected={false}
          reviews={mockReviews}
          isFeed={false}
        />
      </MemoryRouter>
    );
  });

  it('renders the review cards', () => {
    const reviewCards = screen.getAllByTestId('review-card');
    expect(reviewCards.length).toBe(mockReviews.length);
  });

  it('calls onReviewDelete when delete button is clicked', () => {
    const deleteButtons = screen.getAllByTestId('delete-button');
    deleteButtons.forEach((button, index) => {
      fireEvent.click(button);
      expect(mockOnReviewDelete).toHaveBeenCalledWith(mockReviews[index]);
    });
  });
});

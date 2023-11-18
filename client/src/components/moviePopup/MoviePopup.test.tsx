import { fireEvent, render } from '@testing-library/react';
import { MoviePopup } from './MoviePopup';

describe('MoviePopup', () => {
  const movie = {
    id: 'id',
    title: 'Movie Title',
    genre: ['Action', 'Adventure'],
    releaseDate: '2021-01-01',
    posterUrl: 'Poster URL',
    overview: 'Movie overview',
    popularity: 100,
    rating: 4,
    reviews: ['ReviewId'],
  };

  it('renders the MoviePopup component with the provided movie', () => {
    const { getByAltText } = render(<MoviePopup movie={movie} onClose={() => {}} />);
    const movieImage = getByAltText(`Poster for ${movie.title}`);
    expect(movieImage).toBeInTheDocument();
  });

  it('calls the onClose function when the close button is clicked', () => {
    const onCloseMock = vi.fn();

    const { getByTestId } = render(<MoviePopup movie={movie} onClose={onCloseMock} />);
    const closeButton = getByTestId('close-button');

    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls the onClose function when the background is clicked', () => {
    const onCloseMock = vi.fn();

    const { getByTestId } = render(<MoviePopup movie={movie} onClose={onCloseMock} />);
    const moviePopup = getByTestId('movie-popup');

    fireEvent.click(moviePopup);
    expect(onCloseMock).toHaveBeenCalled();
  });
});

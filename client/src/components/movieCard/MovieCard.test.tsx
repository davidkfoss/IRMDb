import { render, screen, fireEvent } from '@testing-library/react';
import { MovieCard } from './MovieCard';
import { Movie } from '../../models/movie';

const mock = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mock,
}));

const scrollToMock = vi.fn();
Object.defineProperty(global.window, 'scrollTo', { value: scrollToMock });

describe('MovieCard Component', () => {
  const movie: Movie = {
    id: 'id',
    title: 'Test Movie',
    genre: ['Action', 'Adventure'],
    releaseDate: '2021-01-01',
    posterUrl: 'Poster URL',
    overview: 'Movie overview',
    popularity: 100,
    rating: 4,
    reviews: ['ReviewId'],
  };

  it('renders the MovieCard component', () => {
    render(<MovieCard movie={movie} />);
    const movieCard = screen.getByText(/2021/i);
    expect(movieCard).toBeVisible();
  });

  it('navigates to the movie details page when the movie card is clicked', () => {
    render(<MovieCard movie={movie} />);
    const movieCard = screen.getByText(/2021/i);
    fireEvent.click(movieCard);
    expect(mock).toHaveBeenCalledWith(`/movies/${movie.id}`);
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });
});

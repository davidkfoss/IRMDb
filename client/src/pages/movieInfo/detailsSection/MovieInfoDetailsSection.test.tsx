import { render, screen } from '@testing-library/react';
import { MovieInfoDetailsSection } from './MovieInfoDetailsSection';

describe('MovieInfoDetailsSection', () => {
  const movie = {
    id: 'id',
    title: 'Test Movie',
    rating: 3.5,
    overview: 'Movie overview',
    releaseDate: '2022-01-01',
    genre: ['Action', 'Adventure'],
    popularity: 120,
    posterUrl: 'Poster URL',
    reviews: [],
  };

  it('renders movie title correctly', () => {
    render(<MovieInfoDetailsSection movie={movie} />);
    expect(screen.getByText('Test Movie')).toBeVisible();
  });

  it('renders movie rating correctly', () => {
    render(<MovieInfoDetailsSection movie={movie} />);
    expect(screen.getByText('3.5/5')).toBeVisible();
  });

  it('renders movie release year correctly', () => {
    render(<MovieInfoDetailsSection movie={movie} />);
    expect(screen.getByText('2022')).toBeVisible();
  });

  it('renders movie genres correctly', () => {
    render(<MovieInfoDetailsSection movie={movie} />);
    expect(screen.getByText('Action')).toBeVisible();
    expect(screen.getByText('Adventure')).toBeVisible();
  });

  it('renders movie overview correctly', () => {
    render(<MovieInfoDetailsSection movie={movie} />);
    expect(screen.getByText('Movie overview')).toBeVisible();
  });
});

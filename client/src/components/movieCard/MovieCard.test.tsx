import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MovieCard } from './MovieCard';
import { Movie } from '../../models/movie';
import { MemoryRouter } from 'react-router-dom';

describe('MovieCard Component', () => {
  const movie: Movie = {
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

  it('renders the MovieCard component', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );

    const movieCardElement = getByRole('button', {
      name: `View details for ${movie.title}`,
    });

    expect(movieCardElement).toBeInTheDocument();
  });
});

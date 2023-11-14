import { render } from '@testing-library/react';
import { Movie } from '../../models/movie';
import { MemoryRouter } from 'react-router-dom';
import { MovieGrid } from './MovieGrid';

describe('MovieGrid Component', () => {
  const movies: Movie[] = [
    {
      id: '1',
      title: 'Movie 1',
      genre: ['Action', 'Adventure'],
      releaseDate: '2021-01-01',
      posterUrl: 'Poster URL',
      overview: 'Movie overview',
      popularity: 100,
      rating: 4,
      reviews: ['ReviewId'],
    },
    {
      id: '2',
      title: 'Movie 2',
      genre: ['Drama'],
      releaseDate: '2021-01-01',
      posterUrl: 'Poster URL',
      overview: 'Movie overview',
      popularity: 20,
      rating: 1,
      reviews: ['ReviewId'],
    },
  ];

  it('renders the MovieGrid component', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <MovieGrid movies={movies} id='movie-grid' />
      </MemoryRouter>
    );

    const movieGrid = await findByTestId('movie-grid');
    expect(movieGrid).toBeInTheDocument();
  });

  it('renders the MovieGrid component with no movies', async () => {
    const { findByRole } = render(
      <MemoryRouter>
        <MovieGrid movies={[]} id='movie-grid' />
      </MemoryRouter>
    );

    const alertElement = await findByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent('No movies found matching the current filters ...');
  });

  it('renders the MovieGrid component with loading state', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <MovieGrid movies={[]} id='movie-grid' pending />
      </MemoryRouter>
    );

    const alertElement = await findByTestId('loading-circle');
    expect(alertElement).toBeInTheDocument();
  });

  it('renders the MovieGrid component with error state', async () => {
    const { findByRole } = render(
      <MemoryRouter>
        <MovieGrid movies={[]} id='movie-grid' rejected />
      </MemoryRouter>
    );

    const alertElement = await findByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent('Something went wrong');
  });
});

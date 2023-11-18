import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MovieInfoReviewSection } from './MovieInfoReviewSection';
import { mockState } from '../../../test/util/mockState';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

// Mock the Redux store
const mockStore = configureStore([]);

describe('MovieInfoReviewSection', () => {
  const store = mockStore(mockState);

  const interstellar = mockState.movies.movies.filter((movie) => movie.title == 'Interstellar').pop();

  it('renders the component', () => {
    render(
      <Provider store={store}>
        <MovieInfoReviewSection movieId={''} />
      </Provider>
    );

    expect(screen.getByTestId('movie-info-review-section')).toBeVisible();
  });

  it('displays the author of the review', async () => {
    render(
      <Provider store={store}>
        <MovieInfoReviewSection movieId={interstellar?.id as string} />
      </Provider>
    );
    const movieReviewedByUsername = await screen.findByText('David Foss');

    expect(movieReviewedByUsername).toBeVisible();
  });
});

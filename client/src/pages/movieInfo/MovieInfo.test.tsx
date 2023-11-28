import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MovieInfo } from './MovieInfo';
import configureStore from 'redux-mock-store';
import { mockState } from '../../test/util/mockState';

vi.mock('react-redux', async () => {
  const actual: object = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('react', async () => {
  const actual: object = await vi.importActual('react');
  return {
    ...actual,
    useEffect: vi.fn(),
  };
});

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockStore = configureStore([]);

describe('MovieInfo', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  const store = mockStore(mockState);
  const currentMovie = mockState.movies.currentMovie;

  it('renders movie details when data is available', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(currentMovie.title)).toBeVisible();
  });

  it('navigates back to the movies page when the back button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieInfo />
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.getByLabelText('Go back');
    backButton.click();

    expect(mockNavigate).toHaveBeenCalledWith('/movies');
  });

  it('does not render the moviePopUp compoent', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('movie-popup')).toBeNull();
  });

  it('renders the moviePopUp component when the poster is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieInfo />
        </MemoryRouter>
      </Provider>
    );

    const poster = screen.getByAltText(currentMovie.title + ' poster');
    fireEvent.click(poster);

    expect(screen.getByTestId('movie-popup')).toBeVisible();
  });
});

import { render, screen } from '@testing-library/react';
import { Feed } from './Feed';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mockState } from '../../test/util/mockState';

vi.mock('react', () => ({
  ...vi.importActual('react'),
  useCallback: () => vi.fn(),
  useEffect: () => vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));

vi.mock('../../hooks/useUser.ts', () => ({
  useUser: () => vi.fn(),
}));

vi.mock('../../store/store.ts', async () => {
  const actual: any = await vi.importActual('../../store/store.ts');
  return {
    ...actual,
    useAppdispatch: vi.fn(),
  };
});

const mockStore = configureStore([]);

afterAll(() => {
  vi.clearAllMocks();
});

describe('FeedReviewSection', () => {
  const store = mockStore(mockState);

  it('renders the popular and recent reviews sections', () => {
    render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    const popularReviewsSection = screen.getByLabelText('Popular reviews');
    const recentReviewsSection = screen.getByLabelText('Recent reviews');

    expect(popularReviewsSection).toBeVisible();
    expect(recentReviewsSection).toBeVisible();
  });

  it('renders the reviews in each section', async () => {
    render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    const reviews = await screen.getAllByTestId('review-card');

    expect(reviews.length).toBe(mockState.reviews.popularReviews.length + mockState.reviews.recentReviews.length);
  });

  it('renders Interstellar as the first popular review', async () => {
    render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    const reviews = await screen.getAllByTestId('review-card');
    const popularReviews = reviews.slice(0, 3);

    expect(popularReviews[0]).toHaveTextContent('Interstellar');
  });

  it('renders Threeeee amigos as the first recent review', async () => {
    render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    const reviews = await screen.getAllByTestId('review-card');
    const recentReviews = reviews.slice(3, 6);

    expect(recentReviews[0]).toHaveTextContent('Threeeee amigos');
  });

  it('popular reviews and recent reviews match the state', async () => {
    render(
      <Provider store={store}>
        <Feed />
      </Provider>
    );

    const reviews = await screen.getAllByTestId('review-card');
    const popularReviews = reviews.slice(0, 3);
    const recentReviews = reviews.slice(3, 6);

    expect(popularReviews[0]).toHaveTextContent(mockState.reviews.popularReviews[0].meta.movieTitle);
    expect(recentReviews[0]).toHaveTextContent(mockState.reviews.recentReviews[0].meta.movieTitle);
  });
});

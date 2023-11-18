import { render, screen } from '@testing-library/react';
import { MovieFilter } from './MovieFilter';

describe('MovieFilter component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
  }));

  vi.mock('../../store/features/movies/moviesSlice.ts', () => ({
    selectFilters: vi.fn(),
  }));

  vi.mock('./filterUtil.ts', () => ({
    getFiltersFromSessionStorage: {
      search: 'test',
      genres: ['Action'],
      sortBy: 'Name',
      direction: 'asc',
    },
    setFiltersInSessionStorage: vi.fn(),
    hasFiltersChanged: vi.fn(),
  }));

  it('renders normal filter view when window size is more than or equal to 1065 pixels', () => {
    vi.mock('@uidotdev/usehooks', () => ({
      useWindowSize: vi.fn(() => ({ width: 1100 })),
    }));

    render(<MovieFilter onChange={() => {}} />);

    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toBeVisible();

    const showFiltersButton = screen.queryByText(/Show filters/i);
    expect(showFiltersButton).toBeNull();
  });
});

import { render, fireEvent, screen } from '@testing-library/react';
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

  it('renders mobile filter view when window size is less than 1065 pixels', () => {
    vi.mock('@uidotdev/usehooks', () => ({
      useWindowSize: vi.fn(() => ({ width: 1064 })),
    }));

    render(<MovieFilter onChange={() => {}} />);

    const showFiltersButton = screen.getByText(/Show filters/i);
    expect(showFiltersButton).toBeVisible();

    const filterOptionBefore = screen.queryByText(/Sort order/i);
    expect(filterOptionBefore).not.toBeVisible();

    fireEvent.click(showFiltersButton);
    const filterOptionAfter = screen.queryByText(/Sort order/i);
    expect(filterOptionAfter).toBeVisible();
  });
});

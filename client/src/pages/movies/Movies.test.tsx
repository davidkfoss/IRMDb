import { render, screen, fireEvent } from '@testing-library/react';
import { Movies } from './Movies';
import configureStore from 'redux-mock-store';
import { mockState } from '../../test/util/mockState';
import { Provider } from 'react-redux';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));
const dispatchMock = vi.fn();
vi.mock('../../hooks/useDebounceDispatch.ts', async () => ({
  default: () => dispatchMock,
}));

const mockStore = configureStore([]);

describe('Movies', () => {
  it('renders movie filters', () => {
    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );
    const movieFilters = screen.getByLabelText('Movie filters');
    expect(movieFilters).toBeVisible();
  });

  it('renders movie grid', () => {
    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );
    const movieGrid = screen.getByLabelText('Movie grid');
    expect(movieGrid).toBeVisible();
  });

  it('renders load more button when there are more movies to fetch', () => {
    let modifiedMockstate = mockState;
    modifiedMockstate.movies.pageSize = 2;
    modifiedMockstate.movies.allFetched = false;
    const store = mockStore(modifiedMockstate);

    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );
    const loadMoreButton = screen.getByLabelText(`Load 2 more movies`);
    expect(loadMoreButton).toBeVisible();
  });

  it('calls onLoadButtonClicked when load more button is clicked', () => {
    const modifiedMockstate = mockState;
    modifiedMockstate.movies.pageSize = 2;
    modifiedMockstate.movies.allFetched = false;
    const store = mockStore(modifiedMockstate);

    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );

    const loadMoreButton = screen.getByLabelText(`Load 2 more movies`);
    fireEvent.click(loadMoreButton);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('does not show load more button when there are no more movies to fetch', () => {
    let modifiedMockstate = mockState;
    modifiedMockstate.movies.allFetched = true;
    const store = mockStore(modifiedMockstate);

    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );
    const loadMoreButton = screen.queryByLabelText(`Load 2 more movies`);
    expect(loadMoreButton).toBeNull();
  });
});

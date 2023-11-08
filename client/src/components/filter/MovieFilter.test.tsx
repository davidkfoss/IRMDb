import { render } from '@testing-library/react';
import { beforeEach, describe, expect, vi, it } from 'vitest';
import { MovieFilter } from './MovieFilter';
import { createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const rootReducer = (state: any, action: any) => {
  state = {
    movies: {
      filters: {
        search: '',
        genre: '',
        sortBy: '',
        ascDesc: '',
      },
    },
  };
  return state;
};

const store = createStore(rootReducer);

describe('MovieFilter component', () => {
  const onChangeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the MovieFilter component', async () => {
    const { getByText, findByTestId } = render(
      <Provider store={store}>
        <MovieFilter onChange={onChangeMock} />
      </Provider>
    );

    const showFiltersText = getByText('Show filters');
    expect(showFiltersText).toBeInTheDocument();

    const searchBar = await findByTestId('search-bar-container');
    expect(searchBar).toBeInTheDocument();
  });
});

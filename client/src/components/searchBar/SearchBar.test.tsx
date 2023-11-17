import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

const searchMock = vi.fn();

describe('SearchBar component', () => {
  it('renders the SearchBar component', async () => {
    render(<SearchBar onSearch={searchMock} />);
    const searchBar = await screen.getByTestId('search-form');
    expect(searchBar).toBeVisible();
  });

  it('calls the onSearch function when the search button is pressed', async () => {
    render(<SearchBar onSearch={searchMock} />);

    const searchButton = await screen.getByTestId('search-button');

    fireEvent.click(searchButton);

    expect(searchMock).toHaveBeenCalledOnce();
  });
});

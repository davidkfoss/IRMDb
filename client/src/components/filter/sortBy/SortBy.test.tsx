import { render, screen } from '@testing-library/react';
import { SortBy } from './SortBy';

describe('SortBy', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    render(<SortBy value='Name' onChange={mockOnChange} name='sort' width={200} />);
  });

  it('renders the SortBy component', () => {
    const sortByLabel = screen.getByText('Sort by');
    expect(sortByLabel).toBeVisible();

    const sortBySelect = screen.getByRole('combobox');
    expect(sortBySelect).toBeVisible();
  });
});

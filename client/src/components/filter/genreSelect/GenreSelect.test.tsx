import { render, screen } from '@testing-library/react';
import { GenreSelect } from './GenreSelect';

describe('GenreSelect', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    render(<GenreSelect value={['Action', 'Comedy']} onChange={mockOnChange} name='genre' width={300} />);
  });

  it('renders the component with correct label', () => {
    const labelElement = screen.getByText('Genres');
    expect(labelElement).toBeVisible();
  });

  it('renders the component with correct options', () => {
    const inputElement = screen.getByTestId('genre-select');

    expect(inputElement.innerHTML).toContain('Action');
    expect(inputElement.innerHTML).toContain('Comedy');
  });
});

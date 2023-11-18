import { render, screen, fireEvent } from '@testing-library/react';
import { AscDesc } from './AscDesc';

describe('AscDesc', () => {
  const handleChange = vi.fn();

  beforeEach(() => {
    render(<AscDesc value='asc' onChange={handleChange} name='sortOrder' />);
  });

  test('renders the AscDesc component', () => {
    const ascDescComponent = screen.getByRole('checkbox');
    expect(ascDescComponent).toBeInTheDocument();
  });

  test('displays the correct sort order label', () => {
    const label = screen.getByText('Sort order');
    expect(label).toBeVisible();
  });

  test('calls the onChange callback when the checkbox is clicked', () => {
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

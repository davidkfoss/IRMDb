import { render, screen } from '@testing-library/react';
import { Pill } from './Pill';

describe('Pill', () => {
  it('renders children correctly', () => {
    render(<Pill>Hello World</Pill>);
    const pillElement = screen.getByText('Hello World');
    expect(pillElement).toBeVisible();
  });

  it('applies custom className correctly', () => {
    render(<Pill className='custom-class'>Hello World</Pill>);
    const pillElement = screen.getByText('Hello World');
    expect(pillElement).toHaveClass('custom-class');
  });

  it('passes restProps correctly', () => {
    render(<Pill data-testid='pill'>Hello World</Pill>);
    const pillElement = screen.getByTestId('pill');
    expect(pillElement).toBeVisible();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { Logo } from './Logo';

const navigateMock = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

describe('Logo', () => {
  it('renders without crashing', () => {
    render(<Logo />);
  });

  it('navigates to the home page when clicked', () => {
    render(<Logo />);
    const logo = screen.getByTestId('logo');
    fireEvent.click(logo);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});

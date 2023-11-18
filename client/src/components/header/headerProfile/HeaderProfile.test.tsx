import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderProfile } from './HeaderProfile';

const logoutMock = vi.fn();
vi.mock('../../../hooks/useLogout', () => ({
  useLogout: () => logoutMock,
}));

describe('HeaderProfile', () => {
  it('renders the component', () => {
    render(<HeaderProfile />);
    const headerProfileElement = screen.getByTestId('header-profile');
    expect(headerProfileElement).toBeVisible();
  });

  it('displays the logout button', () => {
    render(<HeaderProfile />);
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeVisible();
  });

  it('calls the logout function when the logout button is clicked', () => {
    render(<HeaderProfile />);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalled();
  });
});

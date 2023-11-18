import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenu } from './MobileMenu';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

describe('MobileMenu', () => {
  it('renders the account button', () => {
    render(
      <MemoryRouter>
        <MobileMenu user={null} />
      </MemoryRouter>
    );
    const accountButton = screen.getByTestId('mobile-auth');
    expect(accountButton).toBeInTheDocument();
  });

  it('opens the menu when account button is clicked', () => {
    render(
      <MemoryRouter>
        <MobileMenu user={null} />
      </MemoryRouter>
    );
    const accountButton = screen.getByTestId('mobile-auth');
    fireEvent.click(accountButton);
    const accountMenu = screen.getByRole('menu');
    expect(accountMenu).toBeVisible();
  });

  it('renders the user name when user is logged in', () => {
    const user = { name: 'John Doe', email: 'e@e', password: '123456' };
    render(
      <MemoryRouter>
        <MobileMenu user={user} />
      </MemoryRouter>
    );
    const userName = screen.getByText(user.name[0]);
    expect(userName).toBeVisible();
  });

  it('renders the login button when user is not logged in', () => {
    render(
      <MemoryRouter>
        <MobileMenu user={null} />
      </MemoryRouter>
    );
    const loginButton = screen.getByTestId('mobile-auth');
    expect(loginButton).toBeVisible();
  });
});

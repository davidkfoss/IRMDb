import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeaderAuth } from './HeaderAuth';

describe('HeaderAuth', () => {
  afterAll(() => {
    localStorage.clear();
  });

  it('renders NavLink component', () => {
    render(
      <MemoryRouter>
        <HeaderAuth />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toBeVisible();
  });

  it('renders HeaderProfile component', () => {
    render(
      <MemoryRouter>
        <HeaderAuth />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header-auth-not-logged-in')).toBeVisible();
  });

  it('renders HeaderProfile component when logged in', () => {
    // set loacalStorage to have a user
    localStorage.setItem(
      'currUser',
      JSON.stringify({
        name: 'test',
        email: 'e@e',
        password: '123456',
      })
    );
    render(
      <MemoryRouter>
        <HeaderAuth />
      </MemoryRouter>
    );

    const headerProfile = screen.getByTestId('header-profile');
    expect(headerProfile).toBeVisible();
  });
});

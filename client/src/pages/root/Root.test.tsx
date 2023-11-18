import { render, screen } from '@testing-library/react';
import { Root } from './Root';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@uidotdev/usehooks', () => ({
  useWindowSize: () => ({ width: 800 }),
}));
describe('Root', () => {
  it('renders the navigation links', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    const feedLink = screen.getByText('FEED');
    const moviesLink = screen.getByText('MOVIES');

    expect(feedLink).toBeVisible();
    expect(moviesLink).toBeVisible();
  });

  it('renders the logo when the width is greater than or equal to 680', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    const logo = screen.getByTestId('logo');

    expect(logo).toBeVisible();
  });

  it('renders normal auth component and not MobileMenu when the width is greater than or equal to 450', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    const auth = screen.getByTestId('normal-auth');
    const mobileMenu = screen.queryByTestId('mobile-menu');

    expect(auth).toBeVisible();
    expect(mobileMenu).toBeNull();
  });
});

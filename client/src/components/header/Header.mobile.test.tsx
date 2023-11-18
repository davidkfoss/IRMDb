import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

vi.mock('@uidotdev/usehooks', () => ({
  useWindowSize: () => ({ width: 300 }),
}));

describe('Header', () => {
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const feedLink = screen.getByRole('link', { name: /feed/i });
    const moviesLink = screen.getByRole('link', { name: /movies/i });

    expect(feedLink).toBeVisible();
    expect(moviesLink).toBeVisible();
  });

  it('does not render logo when width is smaller than 680', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logo = screen.queryAllByText('IRMDb');

    expect(logo).toHaveLength(0);
  });

  it('renders mobile authentication when width is smaller than 455', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const mobileAuth = screen.getByTestId('mobile-auth');

    expect(mobileAuth).toBeVisible();
  });
});

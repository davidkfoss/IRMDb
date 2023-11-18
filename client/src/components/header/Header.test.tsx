import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

vi.mock('@uidotdev/usehooks', () => ({
  useWindowSize: () => ({ width: 800 }),
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

  it('renders logo when width is greater than or equal to 680', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logo = screen.getByText('IRMDb');

    expect(logo).toBeVisible();
  });

  it('renders normal authentication when width is greater than or equal to 455', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const normalAuth = screen.getByTestId('normal-auth');

    expect(normalAuth).toBeVisible();
  });
});

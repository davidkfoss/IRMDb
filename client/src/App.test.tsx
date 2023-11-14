import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  afterEach(() => {
    window.history.pushState({}, 'Test page', '/');
  });

  it('Should render the landing page', () => {
    render(<App />);

    const popularReviews = screen.getByText(/Popular reviews/i);
    const recentReviews = screen.getByText(/Recent reviews/i);

    expect(popularReviews).toBeVisible();
    expect(recentReviews).toBeVisible();
  });

  it('Should render the link to the movies page and navigate to the path on click', () => {
    render(<App />);
    const movies = screen.getByText(/Movies/i);

    expect(movies).toBeVisible();

    fireEvent.click(movies);
    expect(window.location.pathname).toBe('/movies');
  });

  it('Should render the link to the login page and navigate to the path on click', () => {
    render(<App />);

    const login = screen.getByText(/Login/i);

    expect(login).toBeVisible();

    fireEvent.click(login);
    expect(window.location.pathname).toBe('/login');
  });

  it('Should render the link to the feed page', () => {
    render(<App />);

    const feed = screen.getByText(/Feed/i);

    expect(feed).toBeVisible();
  });

  it('Should render the logo', () => {
    render(<App />);

    const logo = screen.getByText(/IRMDb/i);

    expect(logo).toBeVisible();
  });
});

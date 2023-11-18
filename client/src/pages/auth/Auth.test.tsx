import { render, screen, fireEvent } from '@testing-library/react';
import { Auth } from './Auth';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));

vi.mock('../../store/store.ts', () => ({
  useAppDispatch: () => vi.fn(),
}));

describe('Auth component', () => {
  it('renders the login page by default', () => {
    render(<Auth />);
    const loginHeader = screen.getByText('Sign in to your account');
    expect(loginHeader).toBeVisible();
  });

  it('renders the signup page when the "Sign up!" button is clicked', () => {
    render(<Auth />);
    const signupButton = screen.getByText("Don't have an account? Sign up!");
    const signupHeaderNotVisible = screen.queryByText('Create an account to get started!');
    expect(signupHeaderNotVisible).toBeNull();
    fireEvent.click(signupButton);
    const signupHeader = screen.getByText('Create an account to get started!');
    expect(signupHeader).toBeVisible();
  });

  it('renders the login page when the "Already have an account? Login!" button is clicked', () => {
    render(<Auth />);
    const signupButton = screen.getByText("Don't have an account? Sign up!");
    fireEvent.click(signupButton);
    const loginButton = screen.getByText('Already have an account? Login!');
    fireEvent.click(loginButton);
    const loginHeader = screen.getByText('Sign in to your account');
    expect(loginHeader).toBeVisible();
  });
});

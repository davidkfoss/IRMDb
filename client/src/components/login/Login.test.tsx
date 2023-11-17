import { fireEvent, render, screen } from '@testing-library/react';
import { Login } from './Login';

const mock = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../../hooks/useLogin.ts', () => ({
  useLogin: () => mock,
}));

vi.mock('../../store/store.ts', () => ({
  useAppDispatch: () => vi.fn(),
}));

afterAll(() => {
  vi.clearAllMocks();
});

describe('Login component', () => {
  it('renders the Login component', async () => {
    render(<Login />);
    const loginForm = await screen.findByTestId('login-form');
    expect(loginForm).toBeVisible();
  });

  it('calls the login function when the login form is submitted', async () => {
    render(<Login />);
    const loginForm = await screen.findByTestId('login-form');

    const emailInput = await screen.findByTestId('email');
    const passwordInput = await screen.findByTestId('password');

    fireEvent.input(emailInput, { target: { value: 'email@email' } });
    fireEvent.input(passwordInput, { target: { value: 'password' } });

    fireEvent.submit(loginForm);

    expect(mock).toHaveBeenCalledWith('email@email', 'password');
  });
});

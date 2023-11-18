import { fireEvent, render, screen } from '@testing-library/react';
import { Register } from './Register';

const mock = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../../hooks/useRegister.ts', () => ({
  useRegister: () => mock,
}));

vi.mock('../../store/store.ts', () => ({
  useAppDispatch: () => vi.fn(),
}));

afterAll(() => {
  vi.clearAllMocks();
});

describe('Register component', () => {
  it('renders the Register component', async () => {
    render(<Register />);
    const registerForm = await screen.findByTestId('register-form');
    expect(registerForm).toBeVisible();
  });

  it('calls the register function when the register form is submitted', async () => {
    render(<Register />);
    const registerForm = await screen.findByTestId('register-form');

    const emailInput = await screen.findByTestId('email');
    const passwordInput = await screen.findByTestId('password');
    const nameInput = await screen.findByTestId('name');

    fireEvent.input(emailInput, { target: { value: 'email@email' } });
    fireEvent.input(passwordInput, { target: { value: 'difficultpassword' } });
    fireEvent.input(nameInput, { target: { value: 'testname' } });

    fireEvent.submit(registerForm);

    expect(mock).toHaveBeenCalledWith('email@email', 'difficultpassword', 'testname');
  });

  it;
});

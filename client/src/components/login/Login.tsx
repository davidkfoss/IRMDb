import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import './Login.css';

interface LoginState {
  email: string;
  password: string;
}

const initialLoginState = {
  email: '',
  password: '',
};

export const Login = () => {
  const [loginState, setLoginState] = useState<LoginState>(initialLoginState);
  const navigate = useNavigate();

  const login = useLogin({
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(loginState.email, loginState.password);
  };

  return (
    <section className='auth-page-container'>
      <form onSubmit={handleLogin} id='auth-form' data-testid='login-form'>
        <label>
          Email:
          <input
            type='email'
            name='email'
            data-testid='email'
            value={loginState.email}
            onChange={handleInputChange}
            autoComplete='email'
            required
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
            minLength={6}
            value={loginState.password}
            data-testid='password'
            onChange={handleInputChange}
            autoComplete='current-password'
            required
          />
        </label>
        <button type='submit'>Login</button>
      </form>
    </section>
  );
};

import { useState } from 'react';
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
  const login = useLogin();

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
      <form onSubmit={handleLogin} id='auth-form'>
        <label>
          Email:
          <input type='email' name='email' value={loginState.email} onChange={handleInputChange} required />
        </label>
        <label>
          Password:
          <input type='password' name='password' value={loginState.password} onChange={handleInputChange} required />
        </label>
        <button type='submit'>Login</button>
      </form>
    </section>
  );
};

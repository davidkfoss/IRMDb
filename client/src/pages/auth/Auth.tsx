import { useState } from 'react';
import { Login } from '../../components/login/Login';
import { Register } from '../../components/register/Register';
import './Auth.css';

type Page = 'login' | 'signup';

interface AuthState {
  page: Page;
}

const initialAuthState = {
  page: 'login' as Page,
};

const otherPage = (page: 'login' | 'signup') => (page === 'login' ? 'signup' : 'login');

export const Auth = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const handlePageChange = (page: 'login' | 'signup') => {
    setAuthState((prevState) => ({ ...prevState, page }));
  };

  return (
    <section className='auth-page-container'>
      <h2>{authState.page === 'login' ? 'Login' : 'Sign up'}</h2>
      {authState.page === 'login' ? <Login /> : <Register />}
      <a className='switch-auth-state-button' onClick={() => handlePageChange(otherPage(authState.page))}>
        {otherPage(authState.page)}
      </a>
    </section>
  );
};

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

const pageStateToButtonTextMap: Record<Page, string> = {
  login: 'Already have an account? Login!',
  signup: "Don't have an account? Sign up!",
};

const pageStateToHeaderTextMap: Record<Page, string> = {
  login: 'Sign in to your account',
  signup: 'Create an account to get started!',
};

const otherPage = (page: 'login' | 'signup') => (page === 'login' ? 'signup' : 'login');

export const Auth = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const handlePageChange = (page: 'login' | 'signup') => {
    setAuthState((prevState) => ({ ...prevState, page }));
  };

  return (
    <main className='auth-page-container'>
      <h2>{pageStateToHeaderTextMap[authState.page]}</h2>
      {authState.page === 'login' ? <Login /> : <Register />}
      <a className='switch-auth-state-button' onClick={() => handlePageChange(otherPage(authState.page))}>
        {pageStateToButtonTextMap[otherPage(authState.page)]}
      </a>
    </main>
  );
};

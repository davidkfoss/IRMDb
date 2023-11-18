import { NavLink } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { HeaderProfile } from '../headerProfile/HeaderProfile';
import './HeaderAuth.css';

export const HeaderAuth = () => {
  const user = useUser();

  return user ? (
    <HeaderProfile />
  ) : (
    <NavLink className='header-login-button' to='/login' data-testid='header-auth-not-logged-in'>
      Login
    </NavLink>
  );
};

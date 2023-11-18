import { Avatar } from '@mui/material';
import { useLogout } from '../../../hooks/useLogout';
import './HeaderProfile.css';

export const HeaderProfile = () => {
  const logout = useLogout();

  return (
    <aside className='header-profile-container' data-testid='header-profile'>
      <Avatar sx={{ width: 32, height: 32 }} src={''} />
      <a onClick={logout} role='link' tabIndex={0}>
        Logout
      </a>
    </aside>
  );
};

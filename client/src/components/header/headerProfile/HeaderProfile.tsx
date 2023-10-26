import { useLogout } from '../../../hooks/useLogout';
import { JwtUser } from '../../../hooks/useUser';
import './HeaderProfile.css';

interface HeaderProfileProps {
  user: JwtUser;
}

export const HeaderProfile = ({ user }: HeaderProfileProps) => {
  const logout = useLogout();

  return (
    <div className='header-profile-container'>
      <img className='header-profile-picture' src={user.picture} />
      {/* <span>{user.name}</span> */}
      <span onClick={logout}>Logout</span>
    </div>
  );
};

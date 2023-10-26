import { useUser } from '../../../hooks/useUser';
import { Login } from '../../login/Login';
import { HeaderProfile } from '../headerProfile/HeaderProfile';

export const HeaderAuth = () => {
  const user = useUser();

  return user ? <HeaderProfile user={user} /> : <Login />;
};

import { googleLogout } from '@react-oauth/google';
import { useCallback } from 'react';

export const useLogout = () => {
  const logout = useCallback(() => {
    localStorage.removeItem('currUser');
    googleLogout();
    window.dispatchEvent(new Event('logout'));
  }, []);

  return logout;
};

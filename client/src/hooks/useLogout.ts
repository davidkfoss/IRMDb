import { googleLogout } from '@react-oauth/google';
import { useCallback } from 'react';

/**
 * Returns a function that logs out the current user by removing their data from localStorage,
 * performing a Google logout, and dispatching a 'logout' event on the window object.
 * @returns {() =>void} The logout function.
 */
export const useLogout = (): (() => void) => {
  const logout = useCallback(() => {
    localStorage.removeItem('currUser');
    googleLogout();

    // Dispatch a logout event on the window object
    window.dispatchEvent(new Event('logout'));
  }, []);

  return logout;
};

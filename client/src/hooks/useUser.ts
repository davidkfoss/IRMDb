import { useEffect, useState } from 'react';

export interface User {
  name: string;
  email: string;
  password?: string;
}

/**
 * Retrieves the current user from local storage.
 * @returns {User | null} The current user object or null if not found.
 */
const getUser = (): User | null => {
  const currUser = localStorage.getItem('currUser');
  return currUser ? JSON.parse(currUser) : null;
};

/**
 * A custom hook that returns the current user.
 * @returns {User | null} The current user or null if no user is logged in.
 */
export const useUser = () => {
  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    setCurrUser(getUser());

    const onLogin = () => {
      setCurrUser(getUser());
    };

    const onLogout = () => {
      setCurrUser(null);
    };

    window.addEventListener('login', onLogin);
    window.addEventListener('logout', onLogout);

    return () => {
      window.removeEventListener('login', onLogin);
      window.removeEventListener('logout', onLogout);
    };
  }, []);

  return currUser;
};

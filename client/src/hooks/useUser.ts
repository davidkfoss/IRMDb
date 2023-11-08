import { useEffect, useState } from 'react';

export interface JwtUser {
  aud: string;
  azp: string;
  email: string;
  email_verified: true;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  locale: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

/**
 * Retrieves the current user from local storage.
 * @returns {JwtUser | null} The current user object or null if not found.
 */
const getUser = (): JwtUser | null => {
  const currUser = localStorage.getItem('currUser');
  return currUser ? JSON.parse(currUser) : null;
};

/**
 * A custom hook that returns the current user.
 * @returns {JwtUser | null} The current user or null if no user is logged in.
 */
export const useUser = () => {
  const [currUser, setCurrUser] = useState<JwtUser | null>(null);

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

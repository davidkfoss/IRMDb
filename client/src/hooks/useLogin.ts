import { useCallback } from 'react';
import customToast from '../util/toastWrapper';
import { User } from './useUser';

type LoginResult = 'success' | 'error';

/**
 * Creates a new user in the database if the user does not already exist.
 * @param user - The user to create.
 * @returns A Promise that resolves to a CreateUserResult indicating the status of the operation.
 */
const loginUser: (email: string, password: string) => Promise<User> = async (email, password) => {
  // TODO: Implement this function
  console.log(email, password);

  return {} as User;
};

const loginMessageGeneratorMap: Record<LoginResult, (user?: User) => string> = {
  success: (user) => `Welcome back, ${user?.name}!`,
  error: () => `Please check your email and password and try again.`,
};

interface UseLoginOptions {
  onSuccess?: () => void;
}

export const useLogin = (options: UseLoginOptions) => {
  const login = useCallback(
    async (email: string, password: string) => {
      const user = await loginUser(email, password);

      const status: LoginResult = user ? 'success' : 'error';

      customToast[status](loginMessageGeneratorMap[status](user));

      if (status === 'error') {
        return;
      }

      options.onSuccess?.();
      localStorage.setItem('currUser', JSON.stringify({ ...user }));
      window.dispatchEvent(new Event('login'));
    },
    [options]
  );

  return login;
};

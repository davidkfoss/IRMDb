import { useCallback } from 'react';
import customToast from '../util/toastWrapper';
import { User } from './useUser';

type RegisterResult = 'success' | 'error';

/**
 * Creates a new user in the database if the user does not already exist.
 * @param user - The user to create.
 * @returns A Promise that resolves to a CreateUserResult indicating the status of the operation.
 */
const registerUser: (email: string, password: string, name: string) => Promise<User> = async (
  email,
  password,
  name
) => {
  // TODO: Implement this function
  console.log(email, password, name);

  return {} as User;
};

const registerMessageGeneratorMap: Record<RegisterResult, (user?: User) => string> = {
  success: (user) => `Welcome ${user?.name}!`,
  error: () => `Something went wrong! Are you sure you don't already have an account?`,
};

export const useRegister = () => {
  const register = useCallback(async (email: string, password: string, name: string) => {
    const user = await registerUser(email, password, name);

    const status: RegisterResult = user ? 'success' : 'error';

    customToast[status](registerMessageGeneratorMap[status](user));

    if (status === 'error') {
      return;
    }

    localStorage.setItem('currUser', JSON.stringify({ ...user }));
    window.dispatchEvent(new Event('login'));
  }, []);

  return register;
};

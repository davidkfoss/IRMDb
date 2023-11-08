import { useCallback } from 'react';
import { client } from '../client';
import { getUserByEmailQuery } from '../queries/userQueries';
import customToast from '../util/toastWrapper';
import { User } from './useUser';

type LoginResult = 'success' | 'error';

/**
 * Creates a new user in the database if the user does not already exist.
 * @param user - The user to create.
 * @returns A Promise that resolves to a CreateUserResult indicating the status of the operation.
 */
const loginUser: (email: string, password: string) => Promise<User> = async (email, password) => {
  // Check if user already exists in the database
  console.log(password);
  const existingUser = await client
    .query({
      query: getUserByEmailQuery,
      variables: {
        email: email,
      },
    })
    .then((result) => {
      return result.data.GetUserByEmail;
    });

  return existingUser;
};

const loginMessageGeneratorMap: Record<LoginResult, (user?: User) => string> = {
  success: (user) => `Welcome back, ${user?.name}!`,
  error: () => `Please check your email and password and try again.`,
};

export const useLogin = () => {
  const login = useCallback(async (email: string, password: string) => {
    const user = await loginUser(email, password);

    const status: LoginResult = user ? 'success' : 'error';

    customToast[status](loginMessageGeneratorMap[status](user));

    if (status === 'error') {
      return;
    }

    localStorage.setItem('currUser', JSON.stringify({ ...user }));
    window.dispatchEvent(new Event('login'));
  }, []);

  return login;
};

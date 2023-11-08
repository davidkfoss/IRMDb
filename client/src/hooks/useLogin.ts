import { useCallback } from 'react';
import customToast from '../util/toastWrapper';
import { User } from './useUser';
import { useAppDispatch } from '../store/store';
import { getUserAuth } from '../store/features/user/userThunks';

type LoginResult = 'success' | 'error';

const loginMessageGeneratorMap: Record<LoginResult, (user?: User) => string> = {
  success: (user) => `Welcome back, ${user?.name}!`,
  error: () => `Please check your email and password and try again.`,
};

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const login = useCallback(
    async (email: string, password: string) => {
      const user = await dispatch(getUserAuth({ email, password })).unwrap();

      const status: LoginResult = user ? 'success' : 'error';

      customToast[status](loginMessageGeneratorMap[status](user));

      if (status === 'error') {
        return;
      }

      localStorage.setItem('currUser', JSON.stringify({ ...user }));
      window.dispatchEvent(new Event('login'));
    },
    [dispatch]
  );

  return login;
};

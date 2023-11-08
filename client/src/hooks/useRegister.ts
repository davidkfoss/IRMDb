import { useCallback } from 'react';
import customToast from '../util/toastWrapper';
import { User } from './useUser';
import { useAppDispatch } from '../store/store';
import { createUser } from '../store/features/user/userThunks';

type RegisterResult = 'success' | 'error';

const registerMessageGeneratorMap: Record<RegisterResult, (user: User | null) => string> = {
  success: (user) => `Welcome ${user?.name}!`,
  error: () => `Something went wrong! Are you sure you don't already have an account?`,
};

interface UseRegisterOptions {
  onSuccess?: () => void;
}

export const useRegister = (options: UseRegisterOptions) => {
  const dispatch = useAppDispatch();

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const user = await dispatch(createUser({ email, password, name })).unwrap();

      const status: RegisterResult = user ? 'success' : 'error';

      customToast[status](registerMessageGeneratorMap[status](user));

      if (status === 'error') {
        return;
      }

      options.onSuccess?.();

      localStorage.setItem('currUser', JSON.stringify({ ...user }));
      window.dispatchEvent(new Event('login'));
    },
    [dispatch, options]
  );

  return register;
};

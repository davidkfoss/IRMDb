import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../client';
import { RootState } from '../../store';
import { User } from '../../../models/user';
import { createUserMutation, getUserAuthQuery } from '../../../queries/userQueries';

export const getUserAuth = createAsyncThunk<
  User | null,
  { email: string; password: string; refetch?: boolean },
  { state: RootState }
>('users/getUserAuth', async ({ email, password, refetch = false }) => {
  const user = await client
    .query({
      query: getUserAuthQuery,
      variables: { email: email, password: password },
      fetchPolicy: refetch ? 'no-cache' : undefined,
    })
    .then((result) => {
      return result.data.GetUserAuth ?? null;
    });
  return user;
});

export const createUser = createAsyncThunk<
  User | null,
  { email: string; password: string; name: string; refetch?: boolean },
  { state: RootState }
>('users/createUser', async ({ email, password, name, refetch = false }) => {
  const user = await client
    .mutate({
      mutation: createUserMutation,
      variables: { email: email, password: password, name: name },
      fetchPolicy: refetch ? 'no-cache' : undefined,
    })
    .then((result) => {
      return result.data.CreateUser ?? null;
    });
  return user;
});

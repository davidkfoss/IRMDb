import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../client';
import { RootState } from '../../store';
import { User } from '../../../models/user';
import { createUserMutation, getUserAuthQuery } from '../../../queries/userQueries';

export const getUserAuth = createAsyncThunk<
  User | undefined,
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
      return result.data.GetUserAuth;
    });
  return user;
});

/**
 * A Redux Async Thunk that retrieves the rating of a movie by its ID.
 * @param id - The ID of the movie to retrieve the rating for.
 * @param refetch - Whether to bypass the cache and fetch the rating again.
 * @returns The rating of the movie, or undefined if it could not be retrieved.
 */
export const createUser = createAsyncThunk<
  User | undefined,
  { email: string; password: string; name: string; refetch?: boolean },
  { state: RootState }
>('users/createUser', async ({ email, password, name, refetch = false }) => {
  const user = await client
    .query({
      query: createUserMutation,
      variables: { email: email, password: password, name: name },
      fetchPolicy: refetch ? 'no-cache' : undefined,
    })
    .then((result) => {
      return result.data.CreateUser;
    });
  return user;
});

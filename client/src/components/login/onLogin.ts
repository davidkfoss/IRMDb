import { CredentialResponse, TokenResponse } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { client } from '../../client';
import { JwtUser } from '../../hooks/useUser';
import { createUserMutation, getUserByEmailQuery } from '../../queries/userQueries';
import customToast from '../../util/toastWrapper';

type CreateUserResult = 'ERROR' | 'SUCCESS' | 'ALREADY_EXISTING';

/**
 * Creates a new user in the database if the user does not already exist.
 * @param user - The user to create.
 * @returns A Promise that resolves to a CreateUserResult indicating the status of the operation.
 */
const createUser: (user: JwtUser) => Promise<CreateUserResult> = async (user) => {
  let status: CreateUserResult = 'ERROR';

  // Check if user already exists in the database
  const existingUser = await client
    .query({
      query: getUserByEmailQuery,
      variables: {
        email: user.email,
      },
    })
    .then((result) => {
      return result.data.GetUserByEmail;
    });

  // If user already exists, set status to 'ALREADY_EXISTING'
  if (existingUser && existingUser.id) {
    status = 'ALREADY_EXISTING';
  }

  // If user does not exist, create a new user in the database and set status to 'SUCCESS'
  if (!existingUser) {
    await client
      .mutate({
        mutation: createUserMutation,
        variables: {
          name: user.name,
          email: user.email,
          profilePictureUrl: user.picture,
        },
      })
      .then((result) => {
        status = 'SUCCESS';
        return result.data.CreateUser;
      });
  }

  return status;
};

const loginMessageGeneratorMap: Record<CreateUserResult, (user?: JwtUser) => string> = {
  ALREADY_EXISTING: (user) => `Welcome back, ${user?.name}!`,
  SUCCESS: (user) => `Welcome to IRMDB, ${user?.name}!`,
  ERROR: () => `Something went wrong! Please try again ...`,
};

/**
 * Handles successful login by creating a user, setting the current user in local storage, and dispatching a login event.
 * @param response - The response containing the user's credential.
 * @returns A Promise that resolves or rejects depending on the status of the operation.
 */
export const onLoginSuccess = async (response: CredentialResponse) => {
  if (!response.credential) return;

  const user: JwtUser = jwt_decode(response.credential);
  const status = await createUser(user);
  localStorage.setItem('currUser', JSON.stringify({ ...user, token: response.credential }));
  window.dispatchEvent(new Event('login'));

  customToast.success(loginMessageGeneratorMap[status](user));
};

/**
 * Handles successful login with token response.
 * @param tokenResponse - The token response object.
 * @returns Promise<void>
 */
export const onLoginSuccessToken = async (
  tokenResponse: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>
) => {
  if (!tokenResponse.access_token) return;

  const user: JwtUser = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
  }).then((res) => res.json());

  localStorage.setItem('currUser', JSON.stringify({ ...user, token: tokenResponse.access_token }));
  const status = await createUser(user);
  window.dispatchEvent(new Event('login'));

  customToast.success(loginMessageGeneratorMap[status](user));
};

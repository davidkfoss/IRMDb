import { CredentialResponse, TokenResponse } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { client } from '../../App';
import { JwtUser } from '../../hooks/useUser';
import { createUserMutation, getUserByEmailQuery } from '../../queries/userQueries';
import customToast from '../../util/toastWrapper';

type CreateUserResult = 'ERROR' | 'SUCCESS' | 'ALREADY_EXISTING';

const createUser: (user: JwtUser) => Promise<CreateUserResult> = async (user) => {
  let status: CreateUserResult = 'ERROR';

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

  if (existingUser && existingUser.id) {
    status = 'ALREADY_EXISTING';
  }

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

export const onLoginSuccess = async (response: CredentialResponse) => {
  if (!response.credential) return;

  const user: JwtUser = jwt_decode(response.credential);
  const status = await createUser(user);
  localStorage.setItem('currUser', JSON.stringify({ ...user, token: response.credential }));
  window.dispatchEvent(new Event('login'));

  customToast.success(loginMessageGeneratorMap[status](user));
};

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

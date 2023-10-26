import { CredentialResponse, TokenResponse } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';
import { JwtUser } from '../../hooks/useUser';

export const onLoginSuccess = (response: CredentialResponse) => {
  if (!response.credential) return;

  const user: JwtUser = jwt_decode(response.credential);
  localStorage.setItem('currUser', JSON.stringify({ ...user, token: response.credential }));
  window.dispatchEvent(new Event('login'));
  toast.success(`Welcome, ${user.name}!`);
};

export const onLoginSuccessToken = async (
  tokenResponse: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>
) => {
  console.log(tokenResponse);
  if (!tokenResponse.access_token) return;

  const user: JwtUser = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
  }).then((res) => res.json());

  console.log(user);
  localStorage.setItem('currUser', JSON.stringify({ ...user, token: tokenResponse.access_token }));
  window.dispatchEvent(new Event('login'));
  toast.success(`Welcome, ${user.name}!`);
};

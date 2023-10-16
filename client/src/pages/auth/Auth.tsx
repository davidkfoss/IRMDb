import { GoogleLogin } from '@react-oauth/google';

export const Auth = () => {
  return <GoogleLogin onSuccess={console.log} onError={console.log}></GoogleLogin>;
};

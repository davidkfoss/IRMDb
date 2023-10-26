import { GoogleLogin, GsiButtonConfiguration } from '@react-oauth/google';
import { onLoginSuccess } from './onLogin';

export const Login = () => {
  const buttonStyle: GsiButtonConfiguration = {
    shape: 'pill',
    theme: 'filled_blue',
    text: 'signin',
  };

  return <GoogleLogin onSuccess={onLoginSuccess} {...buttonStyle}></GoogleLogin>;
};

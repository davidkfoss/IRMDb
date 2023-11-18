import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';

interface RegisterState {
  email: string;
  password: string;
  name: string;
}

const initialRegisterState = {
  email: '',
  password: '',
  name: '',
};

export const Register = () => {
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState<RegisterState>(initialRegisterState);
  const register = useRegister({
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, name } = registerState;

    register(email, password, name);
  };

  return (
    <section className='auth-page-container'>
      <form id='auth-form' onSubmit={handleRegister} data-testid='register-form'>
        <label>
          Email:
          <input
            type='email'
            name='email'
            data-testid='email'
            value={registerState.email}
            onChange={handleInputChange}
            autoComplete='email'
            required
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
            autoComplete='new-password'
            minLength={6}
            value={registerState.password}
            data-testid='password'
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Name:
          <input
            type='text'
            name='name'
            data-testid='name'
            value={registerState.name}
            onChange={handleInputChange}
            autoComplete='name'
            required
          />
        </label>
        <button type='submit'>Sign up</button>
      </form>
    </section>
  );
};

import { useState } from 'react';
import { useRegister } from '../../hooks/useRegister';
import { useNavigate } from 'react-router-dom';

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
      <form id='auth-form' onSubmit={handleRegister}>
        <label>
          Email:
          <input type='email' name='email' value={registerState.email} onChange={handleInputChange} required />
        </label>
        <label>
          Password:
          <input type='password' name='password' value={registerState.password} onChange={handleInputChange} required />
        </label>
        <label>
          Name:
          <input type='text' name='name' value={registerState.name} onChange={handleInputChange} required />
        </label>
        <button type='submit'>Sign up</button>
      </form>
    </section>
  );
};

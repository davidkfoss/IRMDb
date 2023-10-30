import { CircularProgress } from '@mui/material';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export const Button = ({ children, loading, ...rest }: ButtonProps) => {
  return (
    <button className='main-button' {...rest} disabled={loading}>
      {loading ? <CircularProgress color='inherit' size='2rem' /> : children}
    </button>
  );
};

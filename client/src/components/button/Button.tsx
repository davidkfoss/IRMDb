import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button className='main-button' {...rest}>
      {children}
    </button>
  );
};

import './Pill.css';

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Pill = ({ children, className, ...restProps }: PillProps) => {
  return (
    <span className={`pill-container ${className}`} {...restProps}>
      {children}
    </span>
  );
};

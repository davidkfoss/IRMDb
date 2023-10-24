import './Pill.css';

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Pill = ({ children, className, ...restProps }: PillProps) => {
  return (
    <div className={`pill-container ${className}`} {...restProps}>
      {children}
    </div>
  );
};

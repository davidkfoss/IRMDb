import './Pill.css';

export const Pill = ({ children }: { children: React.ReactNode }) => {
  return <div className='pill-container'>{children}</div>;
};

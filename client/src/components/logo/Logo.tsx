import { useNavigate } from 'react-router-dom';
import './Logo.css';

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className='logo-container'>
      <div className={'logo-box'} onClick={() => navigate('/')}>
        <span className='logo-text'>IRMDb</span>
      </div>
    </div>
  );
};

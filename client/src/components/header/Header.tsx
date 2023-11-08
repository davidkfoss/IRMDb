import { useWindowSize } from '@uidotdev/usehooks';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { HeaderAuth } from './headerAuth/HeaderAuth';
import { MobileMenu } from './mobileMenu/MobileMenu';
import './Header.css';
import { Logo } from '../logo/Logo';

interface Link {
  name: string;
  path: string;
  className?: string;
}

export const Header = () => {
  const { width } = useWindowSize();
  const user = useUser();

  const links: Link[] = [
    {
      path: '/',
      name: 'Feed',
    },
    {
      path: '/movies',
      name: 'Movies',
    },
  ];

  const className = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
    isPending ? 'pending' : isActive ? 'active' : '';

  return (
    <header className='header'>
      <nav aria-label='Main Navigation'>
        {width && width >= 680 && (
          <div>
            {' '}
            <Logo />
          </div>
        )}
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <NavLink to={link.path} className={link.className || className}>
                {link.name.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>
        {width && width < 455 ? (
          <MobileMenu user={user} />
        ) : (
          <div className='header-auth'>
            <HeaderAuth />
          </div>
        )}
      </nav>
    </header>
  );
};

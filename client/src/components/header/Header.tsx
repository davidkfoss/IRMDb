import { useWindowSize } from '@uidotdev/usehooks';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import './Header.css';
import { HeaderAuth } from './headerAuth/HeaderAuth';
import { MobileMenu } from './mobileMenu/MobileMenu';

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
      <nav>
        {width && width >= 680 && <div></div>}
        <ul>
          {links.map((link) => (
            <NavLink to={link.path} className={link.className || className} key={link.name}>
              {link.name.toUpperCase()}
            </NavLink>
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

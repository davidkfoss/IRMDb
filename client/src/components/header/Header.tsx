import { NavLink } from 'react-router-dom';
import './Header.css';

interface Link {
  name: string;
  path: string;
  className?: string;
}

export const Header = () => {
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
        <ul>
          {links.map((link) => (
            <NavLink to={link.path} className={link.className || className} key={link.name}>
              {link.name.toUpperCase()}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
};

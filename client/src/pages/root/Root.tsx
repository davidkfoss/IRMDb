import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

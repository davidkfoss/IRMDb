import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/Header';

/**
 * Renders the root component of the application.
 * This component is rendered on every page, and contains the header and the outlet
 * for react router routes.
 * @returns The root component.
 */
export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

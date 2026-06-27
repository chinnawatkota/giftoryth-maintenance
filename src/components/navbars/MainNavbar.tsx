import { Link, useLocation } from 'react-router-dom';
import { HamburgerMenuIcon } from '../icons';
import { cn } from '@/utils';
import { LineLink } from '@/constants/contact';

const MainNavbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const onOrderByLine = () => {
    window.open(LineLink, '_blank');
  };

  const closeDrawer = () => {
    const drawerInput = document.getElementById('my-drawer-3') as HTMLInputElement;
    if (drawerInput) {
      drawerInput.checked = false;
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar fixed left-0 right-0 top-0 z-50 h-[100px] w-dvw bg-shadow-black bg-opacity-20 px-4 sm:h-[120px] md:px-6">
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-ghost btn-square"
            >
              <div role="button" className="btn btn-ghost btn-circle">
                <HamburgerMenuIcon className="!size-6 md:!size-8" />
              </div>
            </label>
          </div>
          <div className="navbar-center">
            <Link to="/">
              <img
                src="https://images.giftoryth.com/giftoryth-public/images/logos/logo-red-transparent.webp"
                alt="Basket Shop Logo"
                className="h-32 w-auto sm:h-28 md:h-40 lg:h-48"
                loading="lazy"
              />
            </Link>
          </div>
          <div className="navbar-end gap-x-3">
            <button onClick={onOrderByLine} className="btn btn-ghost btn-circle">
              <img
                src="https://images.giftoryth.com/giftoryth-public/images/icons/line-logo.webp"
                alt="Line Icon"
                className="h-8 w-auto md:h-10"
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="drawer-side pt-[100px] sm:pt-[120px] lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-lg font-extralight">
          <li>
            <Link
              to="/"
              onClick={closeDrawer}
              className={cn(
                `transition-colors duration-300 hover:text-main-red`,
                isActive('/') && 'text-main-red'
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/baskets"
              onClick={closeDrawer}
              className={cn(
                `transition-colors duration-300 hover:text-main-red`,
                isActive('/baskets') && 'text-main-red'
              )}
            >
              Basket
            </Link>
          </li>
          <li>
            <Link
              to="/custom-gift"
              onClick={closeDrawer}
              className={cn(
                `transition-colors duration-300 hover:text-main-red`,
                isActive('/custom-gift') && 'text-main-red'
              )}
            >
              Custom Gift
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={closeDrawer}
              className={cn(
                `transition-colors duration-300 hover:text-main-red`,
                isActive('/about') && 'text-main-red'
              )}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={closeDrawer}
              className={cn(
                `transition-colors duration-300 hover:text-main-red`,
                isActive('/contact') && 'text-main-red'
              )}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainNavbar;

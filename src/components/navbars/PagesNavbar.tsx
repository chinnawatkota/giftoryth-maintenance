import { cn } from '@/utils';
import { Link, useLocation } from 'react-router-dom';

const PagesNavbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname === path + '/';
  };

  return (
    <div className="navbar fixed left-0 right-0 top-[120px] z-50 hidden h-[100px] w-dvw bg-shadow-black bg-opacity-20 px-8 lg:flex">
      <div className="navbar-start" />
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-x-3 px-1 text-xl font-extralight">
          <li>
            <Link
              to="/"
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
      <div className="navbar-end" />
    </div>
  );
};

export default PagesNavbar;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';

const routes = [
  { name: 'Home', to: '/home', isActive: true },
  { name: 'Materials', to: '/materials', isActive: false },
  { name: 'Services', to: '/services', isActive: false },
  { name: 'How It Works', to: '#', isActive: false },
  { name: 'About Us', to: '/about', isActive: false },
  { name: 'Contact', to: '/contact', isActive: false },
  // { name: 'Testimonials', href: '#', isActive: false },
];

const NavMenu = ({ routes }) => (
  <>
    {routes.map((route, i) => (
      <li key={i} className="my-2 lg:my-0">
        <Link
          to={route.to}
          className={`px-4 py-2 ${
            route.isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
          }`}>
          {route.name}
        </Link>
      </li>
    ))}
  </>
);

NavMenu.propTypes = {
  routes: PropTypes.array.isRequired,
};

const AuthNavMenu = ({ isAuthenticated, onLogout }) => (
  <>
    {!isAuthenticated ? (
      <>
        <li className="my-2 lg:my-0">
          <Link
            to="/signup"
            className="border-white border-2 text-white hover:bg-blue-600 hover:text-white py-1.5 px-4 rounded">
            Sign Up
          </Link>
        </li>
        <li className="my-2 lg:my-0">
          <Link
            to="/login"
            className="border-white border-2 text-white hover:bg-blue-600 hover:text-white py-1.5 px-4 rounded">
            Log In
          </Link>
        </li>
      </>
    ) : (
      <li className="my-2 lg:my-0">
        <button
          onClick={onLogout}
          className="border-white border-2 text-white hover:bg-red-600 hover:text-white py-1.5 px-4 rounded">
          Logout
        </button>
      </li>
    )}
  </>
);

AuthNavMenu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func,
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated based on local storage
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); // Adjust the path as needed
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ezy__nav2 light py-4 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white sticky top-0 z-50">
      <nav>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <Link to="/" className="font-black text-2xl lg:text-3xl">
              Junktion
            </Link>
            {!isOpen ? (
              <button
                className="block lg:hidden cursor-pointer h-10 z-20"
                type="button"
                id="hamburger"
                onClick={toggleMenu}>
                <GiHamburgerMenu />
              </button>
            ) : (
              <button
                className="block lg:hidden cursor-pointer h-10 z-20"
                type="button"
                id="hamburger"
                onClick={toggleMenu}>
                <ImCross />
              </button>
            )}
            <ul
              className={`flex flex-col lg:flex-row justify-center items-center text-3xl gap-6 lg:text-base lg:gap-4 absolute lg:relative top-0 left-0 lg:top-auto lg:left-auto lg:w-auto w-full h-screen lg:h-auto bg-white dark:bg-[#0b1727] lg:bg-transparent transition-transform duration-300 ${
                isOpen ? 'transform translate-x-0' : 'transform -translate-x-full lg:translate-x-0'
              }`}
              id="navbar">
              <NavMenu routes={routes} />
              <AuthNavMenu isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

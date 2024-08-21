import React, { useState } from 'react';
import PropTypes from 'prop-types';

const routes = [
  { name: 'Home', href: '/home', isActive: true },
  { name: 'Services', href: '#', isActive: false },
  { name: 'Why us?', href: '#', isActive: false },
  { name: 'How It Works', href: '#', isActive: false },
  { name: 'About Us', href: '/about', isActive: false },
  { name: 'Contact', href: '/contact', isActive: false },
  // { name: 'Testimonials', href: '#', isActive: false },
];

const NavMenu = ({ routes }) => (
  <>
    {routes.map((route, i) => (
      <li key={i} className="my-2 lg:my-0">
        <a
          className={`px-4 py-2 ${route.isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
          href={route.href}>
          {route.name}
        </a>
      </li>
    ))}
  </>
);

NavMenu.propTypes = {
  routes: PropTypes.array.isRequired,
};

const AuthNavMenu = () => (
  <>
    <li className="my-2 lg:my-0">
      <a href="/signup" className="border-white border-2 text-white hover:bg-blue-600 hover:text-white py-1.5 px-4 rounded">
        Sign Up
      </a>
    </li>
    <li className="my-2 lg:my-0">
      <a href="/login" className="border-white border-2 text-white hover:bg-blue-600 hover:text-white py-1.5 px-4 rounded">
        Log In
      </a>
    </li>
  </>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ezy__nav2 light py-4 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white sticky top-0 z-50">
      <nav>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <a className="font-black text-2xl lg:text-3xl" href="#!">
              Junktion
            </a>
            <button
              className="block lg:hidden cursor-pointer h-10 z-20"
              type="button"
              id="hamburger"
              onClick={toggleMenu}>
              <div className="h-0.5 w-7 bg-black dark:bg-white -translate-y-2"></div>
              <div className="h-0.5 w-7 bg-black dark:bg-white"></div>
              <div className="h-0.5 w-7 bg-black dark:bg-white translate-y-2"></div>
            </button>
            <ul
              className={`flex flex-col lg:flex-row justify-center items-center text-3xl gap-6 lg:text-base lg:gap-4 absolute lg:relative top-0 left-0 lg:top-auto lg:left-auto lg:w-auto w-full h-screen lg:h-auto bg-white dark:bg-[#0b1727] lg:bg-transparent transition-transform duration-300 ${
                isOpen ? 'transform translate-x-0' : 'transform -translate-x-full lg:translate-x-0'
              }`}
              id="navbar">
              <NavMenu routes={routes} />
              <AuthNavMenu />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

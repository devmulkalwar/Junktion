import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useGlobalContext } from "../contexts/GlobalContext";

const routes = [
  { name: "Home", to: "/" },
  { name: "Materials", to: "/materials" },
  { name: "Services", to: "/services" },
  { name: "Profile", to: "/profile" },
  { name: "About Us", to: "/about" },
  { name: "Contact", to: "/contact" },
  // { name: 'Testimonials', href: '#', isActive: false },
];

const NavMenu = ({ routes }) => {
  const location = useLocation(); // Get the current location

  return (
    <>
      {routes.map((route, i) => (
        <li key={i} className="my-2 lg:my-0">
          <Link
            to={route.to}
            className={`px-4 py-2 ${
              location.pathname === route.to
                ? "opacity-100" // Active link style
                : "opacity-50 hover:opacity-100"
            }`}
          >
            {route.name}
          </Link>
        </li>
      ))}
    </>
  );
};

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
            className={`border-white border-2 text-white hover:bg-blue-600 hover:text-white py-1.5 px-4 rounded  ${
              location.pathname === "/signup" 
                ? "bg-blue-600" // Active link style
                : ""
            }`}>
            Sign Up
          </Link>
        </li>
        <li className="my-2 lg:my-0">
          <Link
            to="/login"
            className={`border-white border-2 text-white hover:bg-blue-600 hover:text-white py-1.5 px-4 rounded  ${
              location.pathname === "/login"
                ? "bg-blue-600" // Active link style
                : ""
            }`}
          >
            Log In
          </Link>
        </li>
      </>
    ) : (
      <li className="my-2 lg:my-0">
        <button
          onClick={onLogout}
          className="border-white border-2 text-white hover:bg-red-600 hover:text-white py-1.5 px-4 rounded"
        >
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
  const { isAuthenticated, setIsAuthenticated, logout, setUser, setToken } = useGlobalContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Effect to check for stored user and token on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

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
                onClick={toggleMenu}
              >
                <GiHamburgerMenu />
              </button>
            ) : (
              <button
                className="block lg:hidden cursor-pointer h-10 z-20"
                type="button"
                id="hamburger"
                onClick={toggleMenu}
              >
                <ImCross />
              </button>
            )}
            <ul
              className={`flex flex-col lg:flex-row justify-center items-center text-3xl gap-6 lg:text-base lg:gap-4 absolute lg:relative top-0 left-0 lg:top-auto lg:left-auto lg:w-auto w-full h-screen lg:h-auto bg-white dark:bg-[#0b1727] lg:bg-transparent transition-transform duration-300 ${
                isOpen
                  ? "transform translate-x-0"
                  : "transform -translate-x-full lg:translate-x-0"
              }`}
              id="navbar"
            >
              <NavMenu routes={routes} />
              <AuthNavMenu
                isAuthenticated={isAuthenticated}
                onLogout={logout}
              />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

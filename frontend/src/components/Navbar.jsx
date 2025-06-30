import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
  ];

  return (
    <nav className="bg-light shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            JobPortal
          </Link>

          {/* Middle: Desktop Nav Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Desktop Actions */}
          <div className="hidden md:flex gap-3 items-center">
            {user ? (
              <Link to={user.role === "employer" ? "/employer" : "/candidate"}>
                <button className="bg-primary text-light px-4 py-2 rounded-md hover:bg-green transition">
                  Dashboard
                </button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <button className="bg-green text-light px-4 py-2 rounded-md hover:bg-green transition">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-primary text-light px-4 py-2 rounded-md hover:bg-green transition">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-dark text-2xl"
            >
              <HiMenu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-light shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold text-primary">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-dark text-2xl"
            >
              <HiX />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-dark hover:text-primary"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <Link
                to={user.role === "employer" ? "/employer" : "/candidate"}
                onClick={() => setMenuOpen(false)}
              >
                <button className="bg-primary text-light px-4 py-2 rounded-md hover:bg-green transition w-full text-left mt-4">
                  Dashboard
                </button>
              </Link>
            ) : (
              <>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  <button className="bg-green text-light px-4 py-2 rounded-md hover:bg-green transition w-full text-left">
                    Register
                  </button>
                </Link>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="bg-primary text-light px-4 py-2 rounded-md hover:bg-green transition w-full text-left">
                    Login
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-light bg-opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;

import { useNavigate } from 'react-router-dom';
import './header.css';
import { useHeader } from '../../hooks/user/useHeader';

const Header = () => {
  const { isMenuOpen, setIsMenuOpen, HandleLogout, user } = useHeader();
  const navigate = useNavigate();
  return (
    <header className="  shadow-md">
      <nav className="container header  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-blue-600">
              HireNest
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Find Jobs
            </a>
            <a
              href="/profile"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Profile
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && (
              <button
                onClick={() => navigate('/login')}
                className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
              >
                Login
              </button>
            )}
            {!user && (
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Up
              </button>
            )}
            {user && (
              <button
                onClick={HandleLogout}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            )}
            {user && (
              <button
                onClick={() => navigate('/company-register')}
                className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Post a Job
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2 pt-2">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
              >
                Services
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
              >
                Contact
              </a>
              <div className="border-t border-gray-200 pt-4 mt-2 space-y-2">
                <button className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors">
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

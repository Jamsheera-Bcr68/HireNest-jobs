import { useNavigate } from 'react-router-dom';
import './header.css';
import { MessageCircle, MessageSquare, MessageSquareText } from 'lucide-react';
import { useHeader } from '../../hooks/user/useHeader';
import { BellRing } from 'lucide-react';
import { type NotificationType } from '../../../types/notification.type';
import { useNotifications } from '../../hooks/notifications';
import { useEffect, useState } from 'react';
import NotificationModal from './Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../../redux/store';
import { setChatrooms } from '../../../redux/slices/chatroom.slice';
import { setNotifications } from '../../../redux/slices/notification.slice';

import { chatService } from '../../../services/api-services/chat.service';

const Header = ({ title }: { title?: string }) => {
 const [isMenuOpen, setIsMenuOpen]=useState<boolean>(false)

  const navigate = useNavigate();

  return (
    <header className="relative  z-50 mx-4">
      <div className="text-fuchsia -800 fixed top-8 left-2 right-2 rounded-full bg-white border-2 border-fuchsia-700 shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-fuchsia-800">
                HireNest
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#what"
                className="text-fuchsia-800 px-3 py-2 text-sm font-bold transition-transform duration-300 hover:-translate-y-1"
              >
                About
              </a>

              <a
                href="#features"
                className="text-fuchsia-700 px-3 py-2 text-sm font-bold transition-transform duration-300 hover:-translate-y-1"
              >
                Services
              </a>

              <a
                href="#candidates"
                className="text-fuchsia-700 px-3 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-1"
              >
                For Candidates
              </a>

              <a
                href="#employers"
                className="text-fuchsia-700 px-3 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-1"
              >
                For Employers
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-fuchsia-800 text-white hover:bg-fuchsia-500 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </button>

              <button
                onClick={() => navigate('/register')}
                className="bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Register
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 rounded-lg p-2"
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
            <div className="md:hidden relative">
              <div className="absolute right-0 top-full mt-2 w-1/2 max-w-[260px] rounded-xl bg-white shadow-lg border border-slate-200 p-2">
                <div className="flex flex-col space-y-2">
                  <>
                    <a
                      href="#what"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-fuchsia-700 hover:bg-slate-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                    >
                      What is HireNest
                    </a>

                    <a
                      href="#features"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-fuchsia-700 hover:bg-slate-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                    >
                      Services
                    </a>

                    <a
                      href="#candidates"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-fuchsia-700 hover:bg-slate-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                    >
                      For Candidates
                    </a>

                    <a
                      href="#employers"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-fuchsia-700 hover:bg-slate-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                    >
                      For Companies
                    </a>
                  </>

                  <div className="border-t border-slate-200 pt-4 mt-2 space-y-2">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full hover:bg-fuchsia-600 text-white bg-fuchsia-800 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/register');
                      }}
                      className="w-full bg-fuchsia-700 text-white hover:bg-fuchsia-800 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

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

import { setNotifications } from '../../../redux/slices/notification.slice';

const Header = ({ title }: { title?: string }) => {
  const { isMenuOpen, setIsMenuOpen, HandleLogout, user } = useHeader();
  const notifications = useSelector(
    (state: RootState) => state.notification.notifications
  );
  const { getNotifications, markAsRead, markAllAsRead, deleteNotification } =
    useNotifications();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notes, setNots] = useState<NotificationType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user?.role, 'from header');

    const loadNotifications = async () => {
      console.log('from useeffect');

      const nots = await getNotifications('all');
      dispatch(setNotifications(nots));
    };
    loadNotifications();
  }, []);

  const count = notifications.filter((n) => n.isRead === false).length;

  // const fetchNotifications = async (tab: 'new' | 'all') => {
  //   const not = await getNotifications(tab);
  //   console.log('notifications', not);

  //   setNotifications(not);
  // };

  const handleNotificationClick = () => {
    setNotificationOpen(true);
    setNots(notifications.filter((n) => n.isRead === false));
  };

  useEffect(() => {
    if (notificationOpen) {
      setNots(notifications.filter((n) => n.isRead === false));
    }
  }, [notifications, notificationOpen]);

  const tabChange = (tab: 'new' | 'all') => {
    console.log('from tabChange', tab);
    if (tab == 'all') setNots(notifications);
    else setNots(notifications.filter((n) => n.isRead === false));
  };

  const deleteHandle = async (id: string) => {
    console.log('from delete notifivation', id);

    await deleteNotification(id);
    const updated = notifications.filter((n) => n.id !== id);
    dispatch(setNotifications(updated));
  };

  const navigate = useNavigate();

  const onMarkRead = async (id: string) => {
    console.log('form mark as read', id);
    await markAsRead(id);
    const updated = notifications.map((n) =>
      n.id !== id ? n : { ...n, isRead: true }
    );
    dispatch(setNotifications(updated));
  };

  const onMarkAll = async () => {
    console.log('form mark as read');
    await markAllAsRead();
    dispatch(
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
    );
  };

  return (
    <header className="sticky top-0 z-50  shadow-md">
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
              href={
                user?.role == 'candidate'
                  ? '/'
                  : user?.role == 'company'
                    ? '/company'
                    : '/'
              }
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </a>

            {user && (
              <a
                href="/jobs"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Find Jobs
              </a>
            )}
            {user && (
              <a
                href={
                  user?.role == 'candidate'
                    ? '/candidate/profile'
                    : user?.role == 'company'
                      ? '/company/profile'
                      : '/'
                }
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Profile
              </a>
            )}
          </div>
          {user && user.role === 'company' && (
            <button
              onClick={() => navigate('/company/dashboard')}
              className="text-gray-700 bg-blue-50 hover:bg-blue-100 rounded-xl hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
            >
              Go To Dashboard
            </button>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative inline-flex items-center">
              {user && user.role !== 'admin' && (
                <div className="text-yellow-600 transition-colors duration-200 cursor-pointer">
                  <BellRing
                    onClick={handleNotificationClick}
                    size={20}
                    className="transition-transform duration-200 hover:scale-110"
                  />
                </div>
              )}

              {/* Notification Badge */}
              {count !== 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </div>
            <div className="relative inline-flex items-center">
              {user && user.role !== 'admin' && (
                <div className="text-yellow-600 transition-colors duration-200 cursor-pointer">
                  <MessageSquareText
                    onClick={handleNotificationClick}
                    size={20}
                    className="transition-transform duration-200 hover:scale-110"
                  />
                </div>
              )}

              {/* Notification Badge */}
              {count !== 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </div>
            {!user && (
              <button
                onClick={() => {
                  navigate('/login');
                }}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
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

            {user && (user.role === 'candidate' || user.role === 'company') && (
              <button
                onClick={() => navigate('/company')}
                className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Post a job
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
              {/* <a
                href="#"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
              >
                About
              </a> */}
              {/* <a
                href="#"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
              >
                Services
              </a> */}
              {/* <a
                href="#"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
              >
                Contact
              </a> */}
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
      {notificationOpen && (
        <NotificationModal
          notifications={notes}
          onClose={() => setNotificationOpen(false)}
          onMarkRead={onMarkRead}
          onMarkAll={onMarkAll}
          onTabChange={tabChange}
          onDelete={deleteHandle}
        />
      )}
    </header>
  );
};

export default Header;

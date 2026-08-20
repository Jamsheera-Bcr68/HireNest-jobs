import { useNavigate } from 'react-router-dom';
//import './header.css';
import { MessageCircle, MessageSquare, MessageSquareText } from 'lucide-react';
import { useHeader } from '../../../hooks/user/useHeader';
import { BellRing } from 'lucide-react';
import { type NotificationType } from '../../../../types/notification.type';
import { useNotifications } from '../../../hooks/notifications';
import { useEffect, useState } from 'react';
import NotificationModal from '../Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../../../redux/store';
import { setChatrooms } from '../../../../redux/slices/chatroom.slice';
import { setNotifications } from '../../../../redux/slices/notification.slice';

import { chatService } from '../../../../services/api-services/chat.service';
const Header = ({ title }: { title?: string }) => {
  const { isMenuOpen, setIsMenuOpen, HandleLogout, user } = useHeader();
  const notifications = useSelector(
    (state: RootState) => state.notification.notifications
  );
  const chatrooms = useSelector((state: RootState) => state.chatroom.chatrooms);
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

  useEffect(() => {
    const getChatrooms = async () => {
      const data = await chatService.getConversations();
      console.log('chatroms afrer getting chatroom', data);
      dispatch(setChatrooms(data.chatrooms));
    };

    if (user) getChatrooms();
  }, []);

  const count = notifications?.filter((n) => n.isRead === false).length;
  const unreadCount = chatrooms.reduce((acc, ch) => acc + ch.unreadCount, 0);

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

  const handleMessageClick = () => {
    if (user.role == 'company') {
      navigate('/company/messages');
    } else if (user.role === 'candidate') {
      navigate('/candidate/messages');
    }
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

  const showDashboardButton =
    user && ['company', 'candidate'].includes(user.role);

  return (
    <header className="sticky top-0 text-white fixed   z-50     bg-[#8A0999] border-2  shadow-sm">
      <nav className="container  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-white">
              HireNest
            </a>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex space-x-8">
              {user.role === 'company' && (
                <a
                  href={'/company'}
                  className=" px-3 py-2 text-sm font-bold transition-transform duration-300 hover:-translate-y-1"
                >
                  Home
                </a>
              )}

              <a
                href="/jobs"
                className="  px-3 py-2 text-sm font-bold transition-transform duration-300 hover:-translate-y-1"
              >
                Find Jobs
              </a>

              <a
                href={
                  user?.role == 'candidate'
                    ? '/candidate/profile'
                    : user?.role == 'company'
                      ? '/company/profile'
                      : '/'
                }
                className="   transition-all duration-300 px-3 py-2 text-sm font-bold transition-transform duration-300 hover:-translate-y-1"
              >
                Profile
              </a>
            </div>
          )}

          {showDashboardButton && (
            <button
              onClick={() => {
                const url =
                  user.role == 'company'
                    ? '/company/dashboard'
                    : '/candidate/dashboard';
                navigate(url);
              }}
              className="hidden md:flex text-[#8A0999] bg-white hover:bg-[#8A0999]-100 rounded-xl px-4 py-2 text-sm font-medium  hover:scale-110 duration-300"
            >
              Go To Dashboard
            </button>
          )}
         {/* ///// */}


         {/* ///// */}

          {/* Desktop Auth Buttons */}



          {/* Icons + Auth Buttons - Both Mobile & Desktop */}

{/* Desktop: Icons + Auth Buttons */}
<div className="hidden md:flex items-center gap-3">
  {/* Icons - Desktop */}
  <div className="flex gap-2">
    <div className="relative inline-flex items-center">
      {user && user.role !== 'admin' && (
        <div className="text-white transition-colors duration-200 cursor-pointer">
          <BellRing
            onClick={handleNotificationClick}
            size={20}
            className="transition-transform duration-200 hover:scale-110"
          />
        </div>
      )}
      {count !== 0 && (
        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {count}
        </span>
      )}
    </div>
    <div className="relative inline-flex items-center">
      {user && user.role !== 'admin' && (
        <div className="text-white transition-colors duration-200 cursor-pointer">
          <MessageSquareText
            onClick={handleMessageClick}
            size={20}
            className="transition-transform duration-200 hover:scale-110"
          />
        </div>
      )}
      {unreadCount !== 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-[#8A0999] text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {unreadCount}
        </span>
      )}
    </div>
  </div>

  {/* Auth Buttons */}
  {user && (
    <button
      onClick={HandleLogout}
      className="text-[#8A0999] bg-white hover:bg-[#8A0999]-100 rounded-xl px-4 py-2 text-sm font-medium hover:scale-110 duration-300"
    >
      Logout
    </button>
  )}

  {user && (user.role === 'candidate' || user.role === 'company') && (
    <button
      onClick={() => navigate('/company')}
      className="bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
    >
      Post a job
    </button>
  )}
</div>

{/* Mobile: Icons + Menu Button Together */}
<div className="md:hidden flex items-center gap-2">
  {/* Icons - Mobile */}
  <div className="flex gap-2">
    <div className="relative inline-flex items-center">
      {user && user.role !== 'admin' && (
        <div className="text-white transition-colors duration-200 cursor-pointer">
          <BellRing
            onClick={handleNotificationClick}
            size={20}
            className="transition-transform duration-200 hover:scale-110"
          />
        </div>
      )}
      {count !== 0 && (
        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {count}
        </span>
      )}
    </div>
    <div className="relative inline-flex items-center">
      {user && user.role !== 'admin' && (
        <div className="text-white transition-colors duration-200 cursor-pointer">
          <MessageSquareText
            onClick={handleMessageClick}
            size={20}
            className="transition-transform duration-200 hover:scale-110"
          />
        </div>
      )}
      {unreadCount !== 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-[#8A0999] text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {unreadCount}
        </span>
      )}
    </div>
  </div>

  {/* Menu Button */}
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="text-white hover:scale-110 duration-300 focus:outline-none focus:ring-2 rounded-lg p-2"
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
      </nav>

      {isMenuOpen && (
        <div className="md:hidden relative text-[#8A0999]">
          <div className="absolute right-0 top-full mt-2 w-1/2 max-w-[260px] rounded-xl bg-white shadow-lg border border-slate-200 p-2">
            <div className="flex flex-col space-y-2">
              <>
                {user.role === 'company' && (
                  <a
                    href="/company"
                    className="text-indigo-700 hover:bg-slate-100 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                  >
                    Home
                  </a>
                )}
                <a
                  onClick={() => {
                    const url =
                      user.role == 'company'
                        ? '/company/dashboard'
                        : '/candidate/dashboard';
                    navigate(url);
                  }}
                  href="#"
                  className="hover:bg-slate-100 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  DashBoard
                </a>
                <a
                  href={
                    user?.role == 'candidate'
                      ? '/candidate/profile'
                      : user?.role == 'company'
                        ? '/company/profile'
                        : '/'
                  }
                  className=" hover:bg-slate-100 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  Profile
                </a>
                <a
                  href="/jobs"
                  className=" hover:bg-slate-100 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  Jobs
                </a>
                <a
                  href="/company"
                  className=" hover:bg-slate-100 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  Post A Job
                </a>
                <a
                  onClick={HandleLogout}
                  className=" hover:bg-slate-100 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                >
                  Logout
                </a>
              </>

              {/* {user&&} */}
            </div>
          </div>
        </div>
      )}

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
  //   return (
  //     <header className="sticky top-0 z-50  shadow-md">
  //       <nav className="container header  mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-between items-center h-16">
  //           {/* Logo */}
  //           <div className="flex-shrink-0">
  //             <a href="/" className="text-2xl font-bold text-blue-600">
  //               HireNest
  //             </a>
  //           </div>

  //           {/* Desktop Navigation */}
  //           {user&&<div className="hidden md:flex space-x-8">
  //             <a
  //               href={
  //                 user?.role == 'candidate'
  //                   ? '/'
  //                   : user?.role == 'company'
  //                     ? '/company'
  //                     : '/'
  //               }
  //               className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
  //             >
  //               Home
  //             </a>

  //             {user && (
  //               <a
  //                 href="/jobs"
  //                 className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
  //               >
  //                 Find Jobs
  //               </a>
  //             )}
  //             {user && (
  //               <a
  //                 href={
  //                   user?.role == 'candidate'
  //                     ? '/candidate/profile'
  //                     : user?.role == 'company'
  //                       ? '/company/profile'
  //                       : '/'
  //                 }
  //                 className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
  //               >
  //                 Profile
  //               </a>
  //             )}
  //           </div>}

  //           {/* && user.role === 'company' && */}
  //           {/* {user &&user?.role==='company'||user?.role=='candidate'&& (
  //             <button
  //               onClick={() => {
  //                 const url=user.role=='company'?'/company/dashboard':'/candidate/dashboard'
  //                 navigate(url)
  //               }}
  //               className="text-gray-700 bg-blue-50 hover:bg-blue-100 rounded-xl hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
  //             >
  //               Go To Dashboard
  //             </button>
  //           )} */}

  //           {showDashboardButton && (
  //             <button
  //               onClick={() => {
  //                 const url=user.role=='company'?'/company/dashboard':'/candidate/dashboard'
  //                 navigate(url)
  //               }}
  //               className="text-gray-700 bg-blue-50 hover:bg-blue-100 rounded-xl hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
  //             >
  //               Go To Dashboard
  //             </button>

  //           )}

  //           {/* Desktop Auth Buttons */}
  //           <div className="hidden md:flex items-center space-x-4">
  //             <div className="relative inline-flex items-center">
  //               {user && user.role !== 'admin' && (
  //                 <div className="text-yellow-600 transition-colors duration-200 cursor-pointer">
  //                   <BellRing
  //                     onClick={handleNotificationClick}
  //                     size={20}
  //                     className="transition-transform duration-200 hover:scale-110"
  //                   />
  //                 </div>
  //               )}

  //               {/* Notification Badge */}
  //               {count !== 0 && (
  //                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
  //                   {count}
  //                 </span>
  //               )}
  //             </div>
  //             <div className="relative inline-flex items-center">
  //               {user && user.role !== 'admin' && (
  //                 <div className="text-yellow-600 transition-colors duration-200 cursor-pointer">
  //                   <MessageSquareText
  //                     onClick={handleMessageClick}
  //                     size={20}
  //                     className="transition-transform duration-200 hover:scale-110"
  //                   />
  //                 </div>
  //               )}

  //               {/* Notification Badge */}
  //               {unreadCount !== 0 && (
  //                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
  //                   {unreadCount}
  //                 </span>
  //               )}
  //             </div>
  //             {!user && (
  //               <button
  //                 onClick={() => {
  //                   navigate('/login');
  //                 }}
  //                 className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
  //               >
  //                 Login
  //               </button>
  //             )}
  //             {!user && (
  //               <button
  //                 onClick={() => navigate('/register')}
  //                 className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
  //               >
  //                 Sign Up
  //               </button>
  //             )}
  //             {user && (
  //               <button
  //                 onClick={HandleLogout}
  //                 className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
  //               >
  //                 Logout
  //               </button>
  //             )}

  //             {user && (user.role === 'candidate' || user.role === 'company') && (
  //               <button
  //                 onClick={() => navigate('/company')}
  //                 className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
  //               >
  //                 Post a job
  //               </button>
  //             )}
  //           </div>

  //           {/* Mobile Menu Button */}
  //           <div className="md:hidden">
  //             <button
  //               onClick={() => setIsMenuOpen(!isMenuOpen)}
  //               className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-2"
  //             >
  //               <svg
  //                 className="h-6 w-6"
  //                 fill="none"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 viewBox="0 0 24 24"
  //                 stroke="currentColor"
  //               >
  //                 {isMenuOpen ? (
  //                   <path d="M6 18L18 6M6 6l12 12" />
  //                 ) : (
  //                   <path d="M4 6h16M4 12h16M4 18h16" />
  //                 )}
  //               </svg>
  //             </button>
  //           </div>
  //         </div>

  //         {/* Mobile Menu */}

  //       </nav>

  // {isMenuOpen && (
  //   <div className="md:hidden relative">
  //     <div className="absolute right-0 top-full mt-2 w-1/2 max-w-[260px] rounded-xl bg-white shadow-lg border border-gray-200 p-2">
  //       <div className="flex flex-col space-y-2">
  //         <a
  //           href="#"
  //           className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors"
  //         >
  //           Home
  //         </a>

  //         <div className="border-t border-gray-200 pt-4 mt-2 space-y-2">
  //           <button onClick={() => navigate('/login')}
  //            className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors">
  //             Login
  //           </button>
  //           <button
  //             onClick={() => navigate('/register')}
  //             className="w-full bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg text-base font-medium transition-colors"
  //           >
  //             Sign Up
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )}

  //       {notificationOpen && (
  //         <NotificationModal
  //           notifications={notes}
  //           onClose={() => setNotificationOpen(false)}
  //           onMarkRead={onMarkRead}
  //           onMarkAll={onMarkAll}
  //           onTabChange={tabChange}
  //           onDelete={deleteHandle}
  //         />
  //       )}
  //     </header>
  //   );
};

export default Header;

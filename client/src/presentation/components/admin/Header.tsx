import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotificationModal from '../common/Notifications';
import { useNotifications } from '../../hooks/notifications';
import { logout } from '../../../redux/auth-slice';
import type { StateType } from '../../../constants/types/user';
import { authService } from '../../../services/api-services/authServices';
import { useEffect, useState } from 'react';
import { type NotificationType } from '../../../types/notification.type';
import { useToast } from '../../../shared/toast/use-toast';

function Header({
  setTitle,
  title,
  sidebarOpen,
  setSidebarOpen,
}: {
  title: string;
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  setTitle:(title:string)=>void
}) {
  const { user } = useSelector((state: StateType) => state.auth);
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [newCount, setNewCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  const {
    getNotificationCount,
    getNotifications,
    deleteNotification,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const HandleLogout = async () => {
    console.log('form logout function');
    try {
      const data = await authService.logout();
      console.log(data);
      showToast({ msg: data.message, type: 'success' });

      dispatch(logout());
      navigate('/admin/login');
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error.response.data.message || error.message,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    console.log(user?.role, 'from header');

    const getCount = async () => {
      console.log('from useeffect');

      const data = await getNotificationCount();
      console.log('count is ', data.count);
      setNewCount(data.count);
    };
    getCount();
  }, [notifications]);

  const fetchNotifications = async (tab: 'new' | 'all') => {
    const not = await getNotifications(tab);
    console.log('notifications', not);

    setNotifications(not);
  };

  const handleNotificationClick = async () => {
    console.log('from notification click');
    setNotificationOpen(true);
    await fetchNotifications('new');
  };

  const tabChange = async (tab: 'new' | 'all') => {
    console.log('from tabChange', tab);
    await fetchNotifications(tab);
  };

  const deleteHandle = async (id: string) => {
    console.log('from delete notifivation', id);

    await deleteNotification(id);
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
  };

  const navigate = useNavigate();

  const onMarkRead = async (id: string) => {
    console.log('form mark as read', id);
    await markAsRead(id);
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
  };

  const onMarkAll = async () => {
    console.log('form mark as read');
    await markAllAsRead();

    setNotifications([]);
  };
  return (
    <header className="bg-white sticky top-0 w-full flex-1 border-b border-slate-200 px-6 py-4 flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-500 hover:text-slate-700 text-xl"
        >
          ☰
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Admin {title}</h1>
          {/* <p className="text-sm text-slate-500">
            Monday, March 2, 2026 · Platform Overview
          </p> */}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
          <button
            onClick={HandleLogout}
            className="w-9 h-5 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Logout
          </button>
        </div>
         <button
              onClick={() =>{
                setTitle('Dashbord')
                navigate('/admin')}}
              className="text-gray-700 bg-blue-50 hover:bg-blue-100 rounded-xl hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
            >
              Go To Dashboard
            </button>
        <div onClick={handleNotificationClick} className="relative">
          <button className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            🔔
          </button>

          {newCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {newCount}
            </span>
          )}
        </div>
        <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          SA
        </div>
      </div>
      {notificationOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setNotificationOpen(false)}
          onMarkRead={onMarkRead}
          onMarkAll={onMarkAll}
          onTabChange={tabChange}
          onDelete={deleteHandle}
        />
      )}
    </header>
  );
}

export default Header;

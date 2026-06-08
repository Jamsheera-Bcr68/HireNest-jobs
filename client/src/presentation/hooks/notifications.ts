import type { StateType } from '../../constants/types/user';
import { notificationService } from '../../services/api-services/notification.service';
import { useSelector } from 'react-redux';
import { useToast } from '../../shared/toast/use-toast';

export const useNotifications = () => {
  const user = useSelector((state: StateType) => state.auth.user);
  const { showToast } = useToast();

  const getNotifications = async (tab: 'new' | 'all') => {
    if (!user) return [];
    try {
      const data = await notificationService.getNotifications(tab);
      console.log('data after getting notifications', data);

      return data.notifications ?? [];
    } catch (error) {
      console.log(error);
    }
  };

  const getNotificationCount = async () => {
    if (!user) return { count: 0 };
    const count = await notificationService.getCount();
    return count ? count : 0;
  };

  const markAsRead = async (id: string) => {
    try {
      const data = await notificationService.markAsRead(id);
      showToast({ msg: data.message, type: 'success' });
    } catch (error) {}
  };

  const markAllAsRead = async () => {
    try {
      const data = await notificationService.markAllAsRead();
      showToast({ msg: data.message, type: 'success' });
    } catch (error) {}
  };

  const deleteNotification = async (id: string) => {
    try {
      const data = await notificationService.deleteNotification(id);
      showToast({ msg: data.message, type: 'success' });
    } catch (error) {}
  };

  return { getNotifications, getNotificationCount, markAsRead, markAllAsRead,deleteNotification };
};

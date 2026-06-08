import axiosInstance from '../../libraries/axios';
import { API_ENDPOINTS } from '../../constants/api-end-points/general';

export const notificationService = {
  async getNotifications(value: 'new' | 'all') {
    console.log('value', value);

    const res = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS, {
      params: { value },
    });

    return res.data;
  },

  async getCount() {
    const res = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS_COUNT);

    return res.data;
  },

  async markAsRead(id: string) {
    const res = await axiosInstance.patch(API_ENDPOINTS.NOTIFICATION(id));
    return res.data;
  },

  async deleteNotification(id: string) {
    const res = await axiosInstance.delete(API_ENDPOINTS.NOTIFICATION(id));
    return res.data;
  },

  async markAllAsRead() {
    const res = await axiosInstance.patch(API_ENDPOINTS.NOTIFICATIONS);
    return res.data;
  },
};

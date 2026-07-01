import { API_ENDPOINTS } from '../../constants/api-end-points/general';
import axiosInstance from '../../libraries/axios';

export const messageService = {
  async getMessages(chatroomId: string) {
    const res = await axiosInstance.get(API_ENDPOINTS.MESSAGES(chatroomId));
    return res.data;
  },

  async sendMessaage(msg: string, chatroomId: string) {
   // console.log('message from service', msg, chatroomId);

    const res = await axiosInstance.post(API_ENDPOINTS.MESSAGES(chatroomId), {
      text: msg,
    });

    return res.data;
  },

  async getUnreadCount() {
    const res = await axiosInstance.get(API_ENDPOINTS.UNREAD_MESSAGE_COUNT);
    return res.data;
  },
};

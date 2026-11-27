import { API_ENDPOINTS } from '../../constants/api-end-points/general';
import axiosInstance from '../../libraries/axios';

export const messageService = {
  async getMessages(chatroomId: string) {
    const res = await axiosInstance.get(API_ENDPOINTS.MESSAGES(chatroomId));
    console.log('afteer getting messsages', res);

    return res.data;
  },

  async sendMessaage(data: FormData, chatroomId: string) {
    const res = await axiosInstance.post(
      API_ENDPOINTS.MESSAGES(chatroomId),
      data
    );
    console.log('chat send response', res);

    return res.data;
  },

  async getUnreadCount() {
    const res = await axiosInstance.get(API_ENDPOINTS.UNREAD_MESSAGE_COUNT);
    return res.data;
  },
};

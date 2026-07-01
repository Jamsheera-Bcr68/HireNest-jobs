import axiosInstance from '../../libraries/axios';
import { API_ENDPOINTS } from '../../constants/api-end-points/general';

export const chatService = {
  async getConversations() {
    const res = await axiosInstance.get(API_ENDPOINTS.CHATROOMS);
    return res.data;
  },
};

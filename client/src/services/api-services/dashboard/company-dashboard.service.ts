import { API_ENDPOINTS } from '../../../constants/api-end-points/general';
import axiosInstance from '../../../libraries/axios';

export const companyDashboardService = {
  async getStatusData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.COMPANY_DASHBOARD.STATUSCARD
    );
    return res.data;
  },

  async getApplicationData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.COMPANY_DASHBOARD.APPDATA
    );
    return res.data;
  },
  async getTopJobData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.COMPANY_DASHBOARD.JOB_DATA
    );
    return res.data;
  },
  async getInterviewData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.COMPANY_DASHBOARD.INTERVIEW_DATA
    );
    return res.data;
  },
  async getRecentActivities() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.COMPANY_DASHBOARD.RECENT_ACTIVITIES
    );
    return res.data;
  },
  async getPendingActionsData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.COMPANY_DASHBOARD.PENDING_ACTION
    );
    return res.data;
  },
};

import axiosInstance from '../../../libraries/axios';
import { API_ENDPOINTS } from '../../../constants/api-end-points/general';

export const candidateDashboardService = {
  async getStatusData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.CANDIDATE_DASHBOARD.STATUSCARD
    );
    return res.data;
  },
  async getAppData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.CANDIDATE_DASHBOARD.APP_DATA
    );
    return res.data;
  },

  async getUpcomingInterview() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.CANDIDATE_DASHBOARD.UPCOMING_INTERVIEW
    );
    return res.data;
  },
  async getDashboardProfileData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.CANDIDATE_DASHBOARD.PROFILE_DATA
    );
    return res.data;
  },
  async getDashboardRecomendedJoba() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.CANDIDATE_DASHBOARD.RECOMENTED_JOBS
    );
    return res.data;
  },
};

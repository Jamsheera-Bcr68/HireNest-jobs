import axiosInstance from '../../../libraries/axios';
import { API_ENDPOINTS } from '../../../constants/api-end-points/general';

export const adminDashboardService = {
  async getStatusData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN_DASHBOARD.STATUSCARD
    );
    return res.data;
  },

  async getCompanyJobChartData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN_DASHBOARD.COMPANY_JOB_CHARTDATA
    );
    return res.data;
  },

  async getIndustryWiseJobCount() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN_DASHBOARD.JOBCOUNT_BY_INDUSTRY
    );
    return res.data;
  },

  async getUserDistributionData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN_DASHBOARD.USER_DISTRIBUTION
    );
    return res.data;
  },

  async getApplivcationData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN_DASHBOARD.APP_DATA
    );
    return res.data;
  },

  async getInterviewData() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN_DASHBOARD.INTERVIEW_DATA
    );
    return res.data;
  },

  async getPendingCompanies() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN_DASHBOARD.PENDING_COMPANIES
    );
    return res.data;
  },
  async getDashboardPendings() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.ADMIN_DASHBOARD.ACTION_PENDING
    );
    return res.data;
  },
};

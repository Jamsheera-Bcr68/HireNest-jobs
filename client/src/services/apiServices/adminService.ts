import axiosInstance from '../../libraries/axios';
import { type CompanyProfileType } from '../../types/dtos/profileTypes/userTypes';
import { ADMIN_API_ENDPOINTS } from '../../constants/apiEndPoints/admin';
import { type CompanyFilter } from '../../presentation/pages/admin/Companies';
import type { CandidateFilter } from '../../presentation/pages/admin/Candidates';
import type { UserProfileType } from '../../types/dtos/userTypes';

export const adminService = {
  async logout() {
    const res = await axiosInstance.post(
      '/auth/logout',
      {},
      { withCredentials: true }
    );

    return res.data;
  },

  async getAllCompanies(filter: CompanyFilter, page: number, limit: number) {
    console.log('filter ', filter);

    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.COMPANIES, {
      params: { ...filter, page, limit },
    });

    return res.data;
  },

  async getCompany(id: string) {
    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.COMPANY(id));
    return res.data;
  },

  async updateCompany(id: string, data: Partial<CompanyProfileType>) {
    console.log('data', data);

    const res = await axiosInstance.patch(
      ADMIN_API_ENDPOINTS.COMPANY(id),
      data
    );
    return res.data;
  },

  async getCompanyStatus() {
    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.COMPANY_STATUS);
    return res.data;
  },

  async getCandidateStatus() {
    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.CANDIDATES_STATUS);
    return res.data;
  },

  async getCandidates(filter: CandidateFilter, page = 1, limit: number = 10) {
    console.log('candidate filter', filter);

    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.CANDIDATES, {
      params: { ...filter, page, limit },
    });
    return res.data;
  },

  async updateCandidate(id: string, data: Partial<UserProfileType>) {
    console.log('data', data);

    const res = await axiosInstance.patch(
      ADMIN_API_ENDPOINTS.CANDIDATE(id),
      data
    );
    console.log('res.data', res.data);

    return res.data;
  },

  async getCandidate(id: string) {
    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.CANDIDATE(id));
    return res.data;
  },

  async checkExist(url: string) {
    console.log('url from admnservice',url);
    
    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.CHECK_EXIST_FILE, {
       params: { url }
    });
    return res.data;
  },
};

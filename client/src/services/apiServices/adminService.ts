import axiosInstance from '../../libraries/axios';
import { type CompanyProfileType } from '../../types/dtos/profileTypes/userTypes';
import { ADMIN_API_ENDPOINTS } from '../../constants/apiEndPoints/admin';
import { type CompanyFilter } from '../../presentation/pages/admin/Companies';
import type { CandidateFilter } from '../../presentation/pages/admin/Candidates';
import type { UserProfileType } from '../../types/dtos/userTypes';
import { type JobFilterType } from '../../presentation/components/candidate/jobListing/ListingContainter';
import { type StatusType } from '../../types/dtos/profileTypes/userTypes';

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

  async updateCompany(
    id: string,
    data: Partial<CompanyProfileType>,
    reason?: string
  ) {
    console.log('data', data, reason);

    const res = await axiosInstance.patch(ADMIN_API_ENDPOINTS.COMPANY(id), {
      ...data,
      reason,
    });
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
    console.log('url from admnservice', url);

    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.CHECK_EXIST_FILE, {
      params: { url },
    });
    return res.data;
  },

  async getJobstatus() {
    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.JOB_STATUS);
    return res.data;
  },

  async getJobs(
    filter?: Partial<JobFilterType | {}>,
    sortBy?: string,
    limit?: number,
    page: number = 1
  ) {
    console.log('filter,', filter);

    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.JOBS, {
      params: { ...filter, sortBy, limit, page },
    });
    return res.data;
  },

  async updateJobstatus(
    payload: { status: StatusType; reason?: string },
    id: string
  ) {
    console.log('paylodad', payload);
    const data: {
      status: StatusType;
      reasonForRemove?: string;
      reasonForSuspend?: string;
    } = { status: payload.status };
    if (payload.status == 'removed') {
      data.reasonForRemove = payload.reason;
    }
    if (payload.status == 'suspended') {
      data.reasonForSuspend = payload.reason;
    }
    const res = await axiosInstance.patch(
      ADMIN_API_ENDPOINTS.UPDATE_JOBSTATUS(id),
      data
    );
    return res.data;
  },
  async getDetails(id: string) {
    console.log('from getdetaild admin');

    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.JOB_DETAILS(id));
    return res.data;
  },
};

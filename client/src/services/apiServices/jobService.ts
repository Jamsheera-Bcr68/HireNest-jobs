import axiosInstance from '../../libraries/axios';
import { type JobFilterType } from '../../presentation/pages/user/JobListing';
import type { JobFormType } from '../../libraries/validations/company/jobFormValidation';
import { CANDIDATE_API_ENDPOINTS } from '../../constants/apiEndPoints/candidate';

export const jobService = {
  async createPost(jobData: JobFormType) {
    const res = await axiosInstance.post('/jobs', jobData);
    return res.data;
  },

  async getJobs(
    filter: Partial<JobFilterType | {}>,
    sortBy: string,
    limit: number,
    page: number
  ) {
    console.log('filter,', filter);

    const res = await axiosInstance.get(CANDIDATE_API_ENDPOINTS.JOB, {
      params: { ...filter, sortBy, limit, page },
    });
    return res.data;
  },
  async getDetails(id: string) {
    const res = await axiosInstance.get(
      CANDIDATE_API_ENDPOINTS.JOB_DETAILS(id)
    );
    return res.data;
  },
};

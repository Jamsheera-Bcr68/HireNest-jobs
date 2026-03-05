import axiosInstance from '../../libraries/axios';
import { type JobFormType } from '../../libraries/validations/company/jobFormValidation';

export const jobService = {
  async createPost(jobData: JobFormType) {
    const res = await axiosInstance.post('/jobs', jobData);
    return res.data;
  },
};

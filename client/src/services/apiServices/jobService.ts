import axiosInstance from '../../libraries/axios';
import { type JobFilterType } from '../../presentation/components/candidate/jobListing/ListingContainter';
import type { JobFormType } from '../../libraries/validations/company/jobFormValidation';
import { CANDIDATE_API_ENDPOINTS } from '../../constants/apiEndPoints/candidate';
import { API_ENDPOINTS } from '../../constants/apiEndPoints/general';
import { type StatusType } from '../../types/dtos/profileTypes/userTypes';
import type { ReportFormType } from '../../presentation/components/candidate/jobListing/ListingContainter';
import { COMPANY_API_ENDPOINTS } from '../../constants/apiEndPoints/company';

export const jobService = {
  async createPost(jobData: JobFormType) {
    const res = await axiosInstance.post('/jobs', jobData);
    return res.data;
  },

  async updatePost(jobData: JobFormType, id: string) {
    const res = await axiosInstance.put(
      COMPANY_API_ENDPOINTS.UPDATE_JOB(id),
      jobData
    );
    return res.data;
  },

  async getJobs(
    filter?: Partial<JobFilterType | {}>,
    sortBy?: string,
    limit?: number,
    page: number = 1
  ) {
    console.log('filter,', filter);

    const res = await axiosInstance.get(API_ENDPOINTS.JOB, {
      params: { ...filter, sortBy, limit, page },
    });
    return res.data;
  },

  async getSavedJobs(
    filter: Partial<JobFilterType | {}>,
    sortBy: string,
    limit: number,
    page: number
  ) {
    console.log('filter,from getsaved ', filter);
    console.log(
      'CANDIDATE_API_ENDPOINTS.SAVED_JOBS',
      CANDIDATE_API_ENDPOINTS.SAVED_JOBS
    );

    const res = await axiosInstance.get(CANDIDATE_API_ENDPOINTS.SAVED_JOBS, {
      params: { ...filter, sortBy, limit, page },
    });
    return res.data;
  },

  async getDetails(id: string) {
    const res = await axiosInstance.get(API_ENDPOINTS.JOB_DETAILS(id));
    return res.data;
  },

  async reportJob(formData: ReportFormType) {
    const { jobId, ...data } = formData;
    console.log('report form from service', jobId, data);
    const res = await axiosInstance.post(
      CANDIDATE_API_ENDPOINTS.REPORT_JOB(jobId),
      data
    );
    return res.data;
  },

  async saveJob(id: string) {
    console.log('from service', id);
    const res = await axiosInstance.post(CANDIDATE_API_ENDPOINTS.SAVE_JOB(id));
    return res.data;
  },

  async unsaveJob(id: string) {
    console.log('from service', id);
    const res = await axiosInstance.delete(
      CANDIDATE_API_ENDPOINTS.UNSAVE_JOB(id)
    );
    return res.data;
  },

  async getCompanyJobstatus() {
    const res = await axiosInstance.get(COMPANY_API_ENDPOINTS.GET_POST_STATUS);
    return res.data;
  },

  async updateJobstatus(
    payload: { status: StatusType; lastDate?: string },
    id: string
  ) {
    console.log('status', payload);
    const res = await axiosInstance.patch(
      COMPANY_API_ENDPOINTS.UPDATE_JOBSTATUS(id),
      payload
    );
    return res.data;
  },
};

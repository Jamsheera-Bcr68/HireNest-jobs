import axiosInstance from '../../libraries/axios';
import { API_ENDPOINTS } from '../../constants/apiEndPoints/general';
import { type ApplicationStatusType } from '../../types/dtos/application.dto';
import { type ApplicationFilterType } from '../../presentation/hooks/user/candidate/profile/useApplication';

export const applicationService = {
  async applyJob(jobId: string, resumeId: string) {
    // console.log('job id from service,rsume id', jobId,resumeId);

    const res = await axiosInstance.post(API_ENDPOINTS.APPLY_JOB(jobId), {
      resumeId,
    });

    return res.data;
  },

  async getApplicationStatus() {
    const res = await axiosInstance.get(
      API_ENDPOINTS.CANDIDATE_APPLICATON_STATUS
    );
    return res.data;
  },

  async getApplications(
    filter?: Partial<ApplicationFilterType>,
    page = 1,
    limit = 5
  ) {
    console.log('application filter form sercice', filter);

    const res = await axiosInstance.get(API_ENDPOINTS.APPLICATIONS, {
      params: { ...filter, page, limit },
    });
    return res.data;
  },

  async getApplicationDetails(id: string) {
    const res = await axiosInstance.get(API_ENDPOINTS.APPLICATION(id));
    return res.data;
  },

  async withdrawApplication(id: string, status?: ApplicationStatusType) {
    console.log('application id', id);

    const res = await axiosInstance.patch(API_ENDPOINTS.APPLICATION(id), {
      status,
    });
    return res.data;
  },
  async updateAppStatus(
    id: string,
    status?: ApplicationStatusType,
    reason?: string
  ) {
    console.log('application id reason', id, status, reason);

    const res = await axiosInstance.patch(API_ENDPOINTS.APPLICATION(id), {
      status,
      reason,
    });
    return res.data;
  },
};

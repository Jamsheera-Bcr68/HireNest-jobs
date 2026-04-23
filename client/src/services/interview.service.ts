import { API_ENDPOINTS } from '../constants/apiEndPoints/general';
import axiosInstance from '../libraries/axios';
import type { interviewFormType } from '../libraries/validations/company/interview.form.validation';

export const interviewService = {
  async scheduleInterview(data: interviewFormType, applicationId: string) {
    console.log('data from service', data, applicationId);

    const res = await axiosInstance.post(API_ENDPOINTS.INTERVIEWS, {
      ...data,
      applicationId,
    });
    return res.data;
  },
};

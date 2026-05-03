import { API_ENDPOINTS } from '../constants/apiEndPoints/general';
import axiosInstance from '../libraries/axios';
import type { interviewFormType } from '../libraries/validations/company/interview.form.validation';
import type { InterviewFilter } from '../presentation/hooks/user/useInterview';
import type {
  interviewDetailDto,
  InterviewDto,
  InterviewStatusType,
} from '../types/dtos/interview.dto';

export const interviewService = {
  async scheduleInterview(data: interviewFormType, applicationId: string) {
    console.log('data from service', data, applicationId);

    const res = await axiosInstance.post(API_ENDPOINTS.INTERVIEWS, {
      ...data,
      applicationId,
    });
    return res.data;
  },

  async updateInterview(data: interviewFormType, interviewId: string) {
    console.log('data from service', data, interviewId);

    const res = await axiosInstance.put(API_ENDPOINTS.INTERVIEW(interviewId), {
      ...data,
    });
    return res.data;
  },

  async getInterviewsStatus() {
    const res = await axiosInstance.get(API_ENDPOINTS.INTERVIEWS_STATUS);
    return res.data;
  },

  async getInterviews(filter?: Partial<InterviewFilter>, page = 1, limit = 5) {
    console.log('intervews filter form sercice', filter);

    const res = await axiosInstance.get(API_ENDPOINTS.INTERVIEWS, {
      params: { ...filter, page, limit },
    });
    return res.data;
  },

  async updateStaus(id: string, status: InterviewStatusType, reason?: string) {
    console.log('status from service', status);

    const res = await axiosInstance.patch(API_ENDPOINTS.INTERVIEW_STATUS(id), {
      status,
      reason,
    });
    return res.data;
  },

  async updateFiled(id: string, data: Partial<InterviewDto>) {
    console.log('date from service', data);
    const { scheduledAt, ...rest } = data;

    const res = await axiosInstance.patch(API_ENDPOINTS.INTERVIEW(id), {
      ...rest,
      time: scheduledAt?.time,
      date: scheduledAt?.date,
    });
    return res.data;
  },

  async updateResult(id: string, data: Partial<interviewDetailDto>) {
    console.log('date from update service', data);

    const res = await axiosInstance.patch(API_ENDPOINTS.UPDATE_RESULT(id), {
      data,
    });
    return res.data;
  },

  async getInterview(id: string) {
    const res = await axiosInstance.get(API_ENDPOINTS.INTERVIEW(id));
    return res.data;
  },
};

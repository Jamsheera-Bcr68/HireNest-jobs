import { API_ENDPOINTS } from '../../constants/api-end-points/general';
import axiosInstance from '../../libraries/axios';
import type { interviewFormType } from '../../libraries/validations/company/interview.form.validation';
import type { AiInterview } from '../../types/ai-interview.types';
import type { InterviewFilter } from '../../presentation/hooks/user/useInterview';
import { type interviewFeedbackDto } from '../../types/dtos/interview.dto';
import type {
  InterviewDto,
  InterviewStatusType,
} from '../../types/dtos/interview.dto';
import type { ProctorEvent } from '../../presentation/hooks/tab-switch.hook';

export const interviewService = {
  async scheduleInterview(data: interviewFormType, applicationId: string) {
    console.log('data from service scheduke interview', data, applicationId);

    const res = await axiosInstance.post(API_ENDPOINTS.INTERVIEWS, {
      ...data,
      applicationId,
    });
    return res.data;
  },

  async updateInterview(data: interviewFormType, interviewId: string) {
    // console.log('data from service', data, interviewId);

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
    // console.log('intervews filter form sercice', filter);

    const res = await axiosInstance.get(API_ENDPOINTS.INTERVIEWS, {
      params: { ...filter, page, limit },
    });
    return res.data;
  },

  async updateStaus(id: string, status: InterviewStatusType, reason?: string) {
    // console.log('status from service', status, reason);

    const res = await axiosInstance.patch(API_ENDPOINTS.INTERVIEW_STATUS(id), {
      status,
      reason,
    });
    return res.data;
  },

  async updateFiled(id: string, data: Partial<InterviewDto>) {
    //  console.log('date from service', data);
    const { scheduledAt, ...rest } = data;

    const res = await axiosInstance.patch(API_ENDPOINTS.INTERVIEW(id), {
      ...rest,
      time: scheduledAt?.time,
      date: scheduledAt?.date,
    });
    return res.data;
  },

  async updateResult(id: string, data: interviewFeedbackDto) {
    //  console.log('date from update service', data);

    const res = await axiosInstance.patch(API_ENDPOINTS.UPDATE_RESULT(id), {
      data,
    });
    return res.data;
  },

  async getInterview(id: string) {
    const res = await axiosInstance.get(API_ENDPOINTS.INTERVIEW(id));
    return res.data;
  },

  async confirmInterview(id: string, isConfirmed: boolean, action: string) {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.CONFIRM_INTERVIEW(id),
      {
        isConfirmed,
        action,
      }
    );
    return response.data;
  },

  async requestForReschdule(id: string, reason: string) {
    // console.log('from reschedule requwst,reason ', reason);

    const response = await axiosInstance.patch(
      API_ENDPOINTS.RESCHEDULE_REQUEST(id),
      { reason }
    );
    return response.data;
  },

  async generateMeetLink() {
    const response = await axiosInstance.post(API_ENDPOINTS.GENERATE_MEETLINK);
    return response.data;
  },

  async getMeetInfo(meetId: string) {
    const response = await axiosInstance.get(
      API_ENDPOINTS.GET_MEET_INFO(meetId)
    );
    return response.data;
  },

  async startAiInterview(meetId: string) {
    console.log('from start interview');

    const response = await axiosInstance.post(API_ENDPOINTS.AI_MEETING(meetId));
    console.log('ai meeting response', response.data);

    return response.data;
  },

  async updateAiSession(sessionId: string, data: Partial<AiInterview>) {
    console.log('update aisession', data);

    const response = await axiosInstance.patch(
      API_ENDPOINTS.AI_SESSION(sessionId),
      data
    );
    return response.data;
  },

  async submitAiAnswer(sessionId: string, formData: FormData) {
    console.log('from data', formData);

    const response = await axiosInstance.post(
      API_ENDPOINTS.SUBMIT_AI_ANSWER(sessionId),
      formData
    );
    console.log(response.data);

    return response.data;
  },

  async reportViloations(sessionId: string, data: Partial<ProctorEvent>) {
    console.log('vialtion data', sessionId, data);
    const res = await axiosInstance.patch(
      API_ENDPOINTS.INTERVIEW_VIOLATION(sessionId),
      data
    );
    console.log('vialtion response', res);
  },
};

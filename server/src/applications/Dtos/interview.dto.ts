import {
  InterviewMode,
  InterviewResult,
} from '../../domain/enums/interview.enum';
import { InterviewStatusEnum } from '../../domain/enums/statusEnum';

export type interviewInputDto = {
  date: string;
  time: string;
  mode: InterviewMode;
  location: string;
  notes?: string;
  applicationId: string;
  meetLink: string;
  duration: string;
  isAddlinkLater: boolean;
};

export type AggregatedInterviewDto = {
  id: string;
  name: string;
  mode: InterviewMode;
  jobTitle: string;
  company: string;
  result: InterviewResult;
  createdAt: Date;
  appliedAt: string;
  status: InterviewStatusEnum;
  scheduledAt: Date;
};

export type interviewDto = {
  id: string;
  result?: InterviewResult;
  name: string;
  jobTitle: string;
  mode: InterviewMode;
  scheduledAt: { date: string; time: string };
  status: InterviewStatusEnum;
  createdAt: string;
};

export type InterviewStatsCardType = {
  total: number;
  upcoming: number;
  completed: number;
  action_required: number;
};

export type InterviewFilterDto = {
  candidateId: string;
  dateRange?: { startDate: string; endDate: string };
  search?: string;
  status?: InterviewStatusEnum;
  companyId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  mode?: InterviewMode;
  jobId: string;
  result?: InterviewResult;
};

export type InterviewListDto = {
  interviews: interviewDto[];
  totalDocs: number;
};

export type interviewDetailDto = {
  id: string;
  name: string;
  jobTitle: string;
  date: string;
  time: string;
  mode: InterviewMode;
  status: InterviewStatusEnum;
  meetLink?: string;
  location?: string;
  duration: string;
  isConfirmed: boolean;
  result?: InterviewResult;
  feedback?: string;
  isRescheduleRequested: boolean;
  note?: string;
};

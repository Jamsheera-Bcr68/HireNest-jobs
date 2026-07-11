import {
  InterviewMode,
  InterviewResult,
} from '../../domain/enums/interview.enum';
import { InterviewStatusEnum } from '../../domain/enums/status.enum';
import { UserRole } from '../../domain/enums/user.enums';

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
  status?: InterviewStatusEnum;
};

export type AggregatedInterviewDto = {
  id: string;
  name: string;
  mode: InterviewMode;
  jobTitle: string;
  company: string;
  companyLogo: string;
  result: InterviewResult;
  createdAt: Date;
  appliedAt: string;
  isConfirmed: boolean;
  companyId: string;
  candidateId: string;
  isRescheduleRequested: boolean;
  status: InterviewStatusEnum;
  scheduledAt: Date;
  link?:string
};

export type interviewDto = {
  id: string;
  result?: InterviewResult;
  name: string;
  jobTitle: string;
  isRescheduleRequested: boolean;
  companyId: string;
  candidateId: string;
  company: string;
  companyLogo: string;
  mode: InterviewMode;
  chatroomId?: string;
  scheduledAt: { date: string; time: string };
  status: InterviewStatusEnum;
  createdAt: string;
  isConfirmed: boolean;
};

export type InterviewStatsCardType = {
  total: number;
  upcoming: number;
  completed: number;
  passed: number;
  action_required: number;
};

export type InterviewFilterDto = {
  candidateId?: string;
  dateRange?: { startDate: string; endDate: string };
  search?: string;
  status?: InterviewStatusEnum;
  companyId?: string;
  type?:'upcoming'
  page?: number;
  limit?: number;
  sortBy?: string;
  mode?: InterviewMode;
  jobId?: string;
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
  companyName: string;
  companyLogo: string;
  reasonForRescheduleRequest: string;
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
  cancelledBy: UserRole;
};

export type interviewCountFilterDto = {};

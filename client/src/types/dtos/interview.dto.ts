import type { UserRole } from '../../constants/types/user';

export type InterviewResult = 'passed' | 'failed';

export type InterviewMode = 'online' | 'offline';

export const Durations = [30, 45, 60, 90, 120] as const;

export type InterviewStatusType =
  | 'cancelled'
  | 'completed'
  | 'scheduled'
  | 'not-show';

export type InterviewDto = {
  id: string;
  name: string;
  jobTitle: string;
  scheduledAt: { date: string; time: string };
  isRescheduleRequested: boolean;
  status: string;
  mode: InterviewMode;
  result?: string;
  company: string;
  companyLogo: string;
  isConfirmed: boolean;
};

export type interviewDetailDto = {
  id: string;
  name: string;
  jobTitle: string;
  date: string;
  time: string;
  mode: InterviewMode;
  companyName: string;
  companyLogo: string;
  status: InterviewStatusType;
  meetLink?: string;
  location?: string;
  duration: string;
  isConfirmed: boolean;
  isRescheduleRequested: boolean;
  reasonForRescheduleRequest: string;
  note?: string;
  feedback?: string;
  result?: InterviewResult;
  cancelledBy: UserRole;
};

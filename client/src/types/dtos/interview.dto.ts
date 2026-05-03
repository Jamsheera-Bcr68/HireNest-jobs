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
  status: string;
  mode: InterviewMode;
  result?: string;
};

export type interviewDetailDto = {
  id: string;
  name: string;
  jobTitle: string;
  date: string;
  time: string;
  mode: InterviewMode;
  status: InterviewStatusType;
  meetLink?: string;
  location?: string;
  duration: string;
  isConfirmed: boolean;
  isRescheduleRequested: boolean;
  note?: string;
  feedback?: string;
  result?: InterviewResult;
};

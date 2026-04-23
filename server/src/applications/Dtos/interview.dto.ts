import {
  InterviewMode,
  InterviewResult,
} from '../../domain/enums/interview.enum';
import { InterviewStatusEnum } from '../../domain/enums/statusEnum';

export type interviewInputDto = {
  date: string;
  time:string,
  mode: InterviewMode;
  location: string;
  notes?: string;
  applicationId: string;
  meetLink: string;
  duration: string;
  isAddlinkLater: boolean;
};
export type interviewDto = {
  id: string;
  scheduledAt: Date;
  candidateId: string;
  companyId: string;
  mode: InterviewMode;
  jobId: string;
  location: string;
  updatedAt?: Date;
  status: InterviewStatusEnum;
  createdAt: Date;
  feedback?: string;
  notes?: string;
  applicationId: string;
  result?: InterviewResult;
  meetLink?: string;
  duration?: string;
  isAddlinkLater: boolean;
};

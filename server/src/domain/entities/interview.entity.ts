import { InterviewMode, InterviewResult } from '../enums/interview.enum';
import { InterviewStatusEnum } from '../enums/statusEnum';

export interface Interview {
  id: string;
  scheduledAt: Date;
  candidateId: string;
  companyId: string;
  mode: InterviewMode;
  jobId: string;
  location: string;
  updatedAt: Date;
  status: InterviewStatusEnum;
  createdAt: Date;
  feedback?: string;
  notes?: string;
  applicationId: string;
  result?: InterviewResult;
  meetLink: string;
  duration: string;
  isAddlinkLater: boolean;
  isConfirmed: boolean;
  isRescheduleRequested: boolean;
  reasonForCancel?: string;
}

import { ApplicationStatusEnum } from '../enums/status.enum';

export interface Application {
  id: string;
  companyId: string;
  resumeId: string;
  jobId: string;
  candidateId: string;
  appliedAt: string;
  status: ApplicationStatusEnum;
  rejectedReason?: string;
  reviewedAt?: string;
  shortlistedAt?: string;
  interviewSheduledAt?: string;
  offeredAt?: string;
  rejectedAt?: string;
}

import { ApplicationStatusEnum } from '../enums/statusEnum';

export interface Application {
  id: string;
  companyId: string;
  jobId: string;
  candidateId: string;
  appliedAt: string;
  status: ApplicationStatusEnum;
  rejectedReason?: string;
}

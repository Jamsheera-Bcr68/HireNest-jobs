import { StatusEnum } from '../../domain/enums/status.enum';

export interface PendingStatusDataType {
  companies: number;
  jobs: number;
}

export interface PendingActivityDto {
  id: string;
  title:string
  subTitle:string
  type: 'Company Registration' | 'Reported Job'; 
  details: string;
  submitted: string;
  tag:string
  createdAt: string;
  status: 'pending' | 'reported';
}
export interface ReportedJobFilter {
  isReported?: boolean;
  limit?: number;
  status?: StatusEnum;
  sortBy?: 'newest';
}

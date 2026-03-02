import { WorkMode } from '../enums/WorkMode';

export interface Experience {
  userId: string;
  id?: string;
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  role?: string;
  location?: string;
  description?: string;
  isWorking: boolean;
  mode: WorkMode;
}

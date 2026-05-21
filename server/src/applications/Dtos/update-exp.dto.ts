import { WorkMode } from '../../domain/enums/work-mode.enum';
export interface updateExpDto {
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

import { EducationLevel, EducationStatus } from '../enums/EducationEnum';

export interface Education {
  id?: string;
  level: EducationLevel;
  status: EducationStatus;
  userId: string;
  location: string;
  institution: string;
  university: string;
  cgpa: number;
  completedYear: number;
  startYear: number;
  createdAt: Date;
  updatedAt: Date;
}

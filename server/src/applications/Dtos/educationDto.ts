import {
  EducationLevel,
  EducationStatus,
} from '../../domain/enums/EducationEnum';

export interface EducationDto {
  level: EducationLevel;
  status: EducationStatus;
  institution: string;
  location: string;
  startYear: number;
  completedYear?: number;
  cgpa: number;
  university: string;
}

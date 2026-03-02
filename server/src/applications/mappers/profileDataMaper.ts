import { Education } from '../../domain/entities/Education';
import { EducationType } from '../../presentation/http/validators/educationFormValidator';

export class ProfileDataMapper {
  static toEducationDto(data: EducationType) {
    return {
      level: data.level,
      status: data.status,
      institution: data.institution,
      location: data.location,
      startYear: Number(data.startYear),
      completedYear: data.completedYear
        ? Number(data.completedYear)
        : undefined,
      cgpa: Number(data.cgpa),
      university: data.university,
    };
  }
  static toEducationResDto(data: Education) {
    return {
      level: data.level,
      status: data.status,
      institution: data.institution,
      location: data.location,
      startYear: Number(data.startYear),
      completedYear: data.completedYear
        ? Number(data.completedYear)
        : undefined,
      cgpa: Number(data.cgpa),
      university: data.university,
    };
  }
}

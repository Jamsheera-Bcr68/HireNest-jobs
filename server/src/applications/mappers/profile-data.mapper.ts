import { Education } from '../../domain/entities/education.entity';
import { EducationType } from '../../presentation/http/validators/education-form.validator';

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

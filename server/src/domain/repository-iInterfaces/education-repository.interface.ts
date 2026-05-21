import { Education } from '../entities/education.entity';
import { IBaseRepository } from './base-repository.interface';

export interface IEducationRepository extends IBaseRepository<Education> {
  addEducation(data: Partial<Education>): Promise<Education | null>;
  editEducation(
    eduId: string,
    data: Partial<Education>
  ): Promise<Education | null>;
  getAllEducations(userId: string): Promise<Education[] | []>;
}

import { Education } from '../entities/Education';
import { IBaseRepository } from './IBaseRepository';

export interface IEducationRepository extends IBaseRepository<Education> {
  addEducation(data: Partial<Education>): Promise<Education | null>;
  editEducation(
    eduId: string,
    data: Partial<Education>
  ): Promise<Education | null>;
  getAllEducations(userId: string): Promise<Education[] | []>;
}

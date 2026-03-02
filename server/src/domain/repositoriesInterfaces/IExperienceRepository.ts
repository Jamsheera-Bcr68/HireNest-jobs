import { IExperienceDocument } from '../../infrastructure/database/models/user/experienceModel';
import { Experience } from '../entities/Experience';
import { IBaseRepository } from './IBaseRepository';

export interface IExperienseRepository extends IBaseRepository<Experience> {
  addExperience(data: Partial<Experience>): Promise<Experience | null>;
  editExperience(
    expId: string,
    data: Partial<Experience>
  ): Promise<Experience | null>;
}

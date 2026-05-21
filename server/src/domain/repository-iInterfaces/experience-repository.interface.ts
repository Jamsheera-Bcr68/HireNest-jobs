import { IExperienceDocument } from '../../infrastructure/database/models/user/experienceModel';
import { Experience } from '../entities/experience.entity';
import { IBaseRepository } from './base-repository.interface';

export interface IExperienseRepository extends IBaseRepository<Experience> {
  addExperience(data: Partial<Experience>): Promise<Experience | null>;
  editExperience(
    expId: string,
    data: Partial<Experience>
  ): Promise<Experience | null>;
}

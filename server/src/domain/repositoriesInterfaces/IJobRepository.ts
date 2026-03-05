import { Job } from '../entities/Job';
import { IBaseRepository } from './IBaseRepository';

export interface IJobRepository extends IBaseRepository<Job> {}

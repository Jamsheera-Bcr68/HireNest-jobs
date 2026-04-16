import { IBaseRepository } from './IBaseRepository';
import { IApplicationDocument } from '../../infrastructure/database/models/application.model';
import { Application } from '../entities/application';
export interface IApplicationRepository extends IBaseRepository<Application> {
  findByUserIdAndJobId(
    userId: string,
    jobId: string
  ): Promise<Application | null>;
  getDocsByUserId(userId: string): Promise<Application[]>;
  getDocsByJobId(jobId: string): Promise<Application[]>;
 // count(filtre?:Partial<Application>):Promise<number>
}

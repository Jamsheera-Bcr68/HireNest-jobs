import { IBaseRepository } from './base-repository.interface';
import { IApplicationDocument } from '../../infrastructure/database/models/application.model';
import { AggregatedApplication } from '../../applications/dtos/application.dto';
import { Application } from '../entities/application.entity';
import {
  ApplicationFilterDto,
  ApplicationListDto,
} from '../../applications/dtos/application.dto';
export interface IApplicationRepository extends IBaseRepository<Application> {
  findByUserIdAndJobId(
    userId: string,
    jobId: string
  ): Promise<Application | null>;
  getDocsByUserId(userId: string): Promise<Application[]>;
  getDocsByJobId(jobId: string): Promise<Application[]>;
  count(filter?: Partial<Application>): Promise<number>;
  getAllApplications(
    filter: Partial<ApplicationFilterDto>
  ): Promise<{ applications: AggregatedApplication[]; totalDocs: number }>;
}

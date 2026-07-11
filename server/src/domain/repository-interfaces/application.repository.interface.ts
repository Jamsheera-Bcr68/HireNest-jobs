import { IBaseRepository } from './base-repository.interface';
import { IApplicationDocument } from '../../infrastructure/database/models/application.model';
import { AggregatedApplication } from '../../applications/dtos/application.dto';
import { Application } from '../entities/application.entity';
import {
  ApplicationFilterDto,
  ApplicationListDto,
} from '../../applications/dtos/application.dto';
import { IndustryType } from '../types/company-profile.types';
import { ApplicationStatusEnum } from '../enums/status.enum';
export interface IApplicationRepository extends IBaseRepository<Application> {
  findByUserIdAndJobId(
    userId: string,
    jobId: string
  ): Promise<Application | null>;
  getDocsByUserId(userId: string): Promise<Application[]>;
  getDocsByJobId(jobId: string): Promise<Application[]>;
  count(filter?: Partial<ApplicationFilterDto>): Promise<number>;
  getAllApplications(
    filter: ApplicationFilterDto
  ): Promise<{ applications: AggregatedApplication[]; totalDocs: number }>;

   count(filter:ApplicationFilterDto):Promise<number>
   getIndustryWiseApplcationCount():Promise<{_id:IndustryType,count:number}[]>
   getCountByStatus(userId:string):Promise<{status:ApplicationStatusEnum,count:number}[]>
}

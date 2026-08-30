import { Company } from '../../domain/entities/company.entity';
import { Job } from '../../domain/entities/job.entity';
import { PendingActivityDto } from '../types/pending.type';
import { MappedAggregatedReportedJob } from '../../infrastructure/repositories/job.repository';

export class PendingActivityMapper {
  static mapToReportedJob(
    job: MappedAggregatedReportedJob
  ): PendingActivityDto {
    return {
      id: job.id,
     title:job.role,
     subTitle:job.company,
      type: 'Reported Job',
     details:job.reason,
      submitted:new Date( job.submitted).toDateString(),
      createdAt: new Date(job.createdAt).toDateString(),
      tag: `${job.count} Report${job.count>1?'s':''}`,
      status: 'reported',
    };
  }
  static mapToPendingCompany(company: Company): PendingActivityDto {
return {
      id: company.id ?? '',
      type: 'Company Registration',
    title:company.companyName,
    subTitle:company.industry,
      details: company.email?company.email:'',
      submitted: company.reapplyCount
        ? company.reapplyDetails[company.reapplyCount - 1].date.toDateString()
        : company.joinedAt.toISOString(),
      createdAt: company.joinedAt.toDateString(),
      tag: company.reapplyCount?`${company.reapplyCount} Reapplication`:'New',
      status: 'pending',
    }
  
  }
    
}

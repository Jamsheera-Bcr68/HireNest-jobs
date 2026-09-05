import { Company } from '../../../domain/entities/company.entity';
import { ApplicationStatusEnum } from '../../../domain/enums/status.enum';
import { AppError } from '../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { CompanyDataDto } from '../../dtos/company.dto';
import { CompanyMapper } from '../../mappers/company.mapper';

export interface IGetCompanyUseCase {
  execute(userId: string): Promise<CompanyDataDto>;
}

export class GetCompanyUseCase implements IGetCompanyUseCase {
  constructor(
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository,
    private _applicationRepository: IApplicationRepository,
    private _interviewRepository: IInterviewRepository
  ) {}
  async execute(userId: string): Promise<CompanyDataDto> {
    const company = await this._companyRepository.findByUserId(userId);
     console.log('companyUserId', userId,company);

    if (!company)
      throw new AppError(
        userMessages.error.COMPANY_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    const totalJobs = await this._jobRepository.count({
      companyId: company.id,
    });
    const hiredCount = await this._applicationRepository.count({
      companyId: company.id,
      status: ApplicationStatusEnum.HIRED,
    });
    const totalApps = await this._applicationRepository.count({
      companyId: company.id,
    });
    console.log('total apps',totalApps);
    
    const totalInterviews = await this._interviewRepository.count({
      companyId: company.id,
    });
    console.log('total interviews',totalInterviews);
    

    return {
      ...CompanyMapper.toCompanyDataDto(company),
      totalJobs,
      hiredCount,
      totalApps,
      totalInterviews,
    };
  }
}

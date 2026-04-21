import { Application } from '../../../domain/entities/application';
import { AppError } from '../../../domain/errors/AppError';
import { IApplicationRepository } from '../../../domain/repositoriesInterfaces/application.repository.interface';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import {
  ApplicationListDto,
  ApplicationFilterDto,
  AggregatedApplication,
} from '../../Dtos/application.dto';
import { IGetAllEntitiesUsecase } from '../../interfaces/usecases/get-all-entities.usecase.interface';
import { ApplicationMapper } from '../../mappers/application.mapper';

export class GetAllApplicationsUsecase implements IGetAllEntitiesUsecase<
  ApplicationListDto,
  ApplicationFilterDto
> {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository
  ) {}
  async execute(
    filter: Partial<ApplicationFilterDto>
  ): Promise<ApplicationListDto> {
    const { applications, totalDocs } =
      await this._applicationRepository.getAllApplications(filter);
    console.log('applications from usecase', applications, totalDocs);

    const appDtos = applications.map((app: AggregatedApplication) =>
      ApplicationMapper.toApplicationDto(app)
    );
    return { applications: appDtos, totalDocs };
  }
}

import { Application } from '../../../domain/entities/application.entity';
import { AppError } from '../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import {
  ApplicationListDto,
  ApplicationFilterDto,
  AggregatedApplication,
} from '../../dtos/application.dto';
import { IGetAllEntitiesUsecase } from '../../interfaces/usecases/get-all-entities.usecase.interface';
import { ApplicationMapper } from '../../mappers/application.mapper';

export class GetAllApplicationsUsecase implements IGetAllEntitiesUsecase<
  ApplicationListDto,
  ApplicationFilterDto
> {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository,
    private _userRepository:IUserRepository
  ) {}
  async execute(
    filter: Partial<ApplicationFilterDto>
  ): Promise<ApplicationListDto> {
    const { applications, totalDocs } =
      await this._applicationRepository.getAllApplications(filter);
    console.log('applications from usecase', applications, totalDocs);
const appDtos=applications.map((a:AggregatedApplication)=>ApplicationMapper.toApplicationDto(a))
   
//    const appDtos = await Promise.all(
//   applications.map(async (app: AggregatedApplication) => {
//     const candidate = await this._userRepository.findById(app.candidateId);

//     return ApplicationMapper.toApplicationDto(app, candidate);
//   })
// );

return {
  applications: appDtos,
  totalDocs,
};
  }
}

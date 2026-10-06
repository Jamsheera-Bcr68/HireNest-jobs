import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';

import {
  ApplicationListDto,
  ApplicationFilterDto,
  AggregatedApplication,
} from '../../dtos/application.dto';
import { IGetAllEntitiesUsecase } from '../../interfaces/usecases/get-all-entities.usecase.interface';
import { ApplicationMapper } from '../../mappers/application.mapper';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export class GetAllApplicationsUsecase implements IGetAllEntitiesUsecase<
  ApplicationListDto,
  ApplicationFilterDto
> {
  constructor(
    private _applicationRepository: IApplicationRepository,
   
    private _fileUrlResolverService: IFileResolverService
  ) {}
  async execute(
    filter: Partial<ApplicationFilterDto>
  ): Promise<ApplicationListDto> {
    const { applications, totalDocs } =
      await this._applicationRepository.getAllApplications(filter);

    const appDtos = applications.map((a: AggregatedApplication) =>
      ApplicationMapper.toApplicationDto(a)
    );

    const fileUrlResolver = this._fileUrlResolverService.createResolver();

    return {
      applications: await Promise.all(
        appDtos.map(async (app) => {
          return {
            ...app,
            logo: await fileUrlResolver(app.logo),
          };
        })
      ),
      totalDocs,
    };
  }
}

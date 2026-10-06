import { StatusEnum } from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { PendingCompany } from '../../../dtos/company.dto';
import { IFileResolverService } from '../../../services/file-url-resolver.service';

export interface IGetPendingCompaniesUsecase {
  execute(role: UserRole): Promise<PendingCompany[]>;
}

export class GetPendingCompaniesUsecase implements IGetPendingCompaniesUsecase {
  constructor(
    private _companyRepository: ICompanyRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {}

  async execute(role: UserRole): Promise<PendingCompany[]> {
    if (role !== UserRole.ADMIN)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );

    const companies = await this._companyRepository.getCompanies(
      { status: StatusEnum.PENDING },
      4
    );
    const fileUrlResolver = this._fileUrlResolverService.createResolver();
    const updatedCompanies = await Promise.all(
      companies.map(async (com) => {
        const { country, state, place } = com.address;

        const location = state + ',' + country;

        return {
          id: com.id?.toString() ?? '',
          email: com.email,
          name: com.companyName,
          industry: com.industry,

          location: location,
          logoUrl: await fileUrlResolver(com.logoUrl),
          submittedAt: com.joinedAt.toDateString(),
        };
      })
    );
    return updatedCompanies;
  }
}

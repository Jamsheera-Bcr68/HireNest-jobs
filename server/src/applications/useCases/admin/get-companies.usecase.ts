import { CompanyListDTO, PaginatedCompanies } from '../../dtos/company.dto';
import { Company } from '../../../domain/entities/company.entity';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IAdminRepository } from '../../../domain/repository-interfaces/admin.reporitory.interface';

export interface IGetCompaniesUseCase {
  execute(
    userId: string,
    role: UserRole,
    filter: Partial<Company>,
    page: number,
    search: string | '',
    limit: number,
    sortBy: string
  ): Promise<PaginatedCompanies>;
}
export class GetCompaniesUseCase implements IGetCompaniesUseCase {
  constructor(
    private _companyRepository: ICompanyRepository,
    private _adminRepository: IAdminRepository
  ) {}
  async execute(
    userId: string,
    role: UserRole,
    filter: Partial<Company>,
    page: number,
    search: string,
    limit: number,
    sortBy: string
  ): Promise<PaginatedCompanies> {
    if (role !== UserRole.ADMIN) {
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    }
    const admin = await this._adminRepository.findById(userId);
    if (!admin) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Admin'),
        statusCodes.NOTFOUND
      );
    }
    const data = await this._companyRepository.getCompanyList(
      filter,
      page,
      search,
      limit,sortBy
    );
     console.log('filtered companes', data);

    return data;
  }
}

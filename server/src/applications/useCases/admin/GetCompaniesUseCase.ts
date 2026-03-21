import { CompanyListDTO, PaginatedCompanies } from '../../Dtos/companyDto';
import { Company } from '../../../domain/entities/company';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';

export interface IGetCompaniesUseCase {
  execute(
    filter: Partial<Company>,
    page: number,
    search: string | '',
    limit: number
  ): Promise<PaginatedCompanies>;
}
export class GetCompaniesUseCase implements IGetCompaniesUseCase {
  constructor(private companyRepository: ICompanyRepository) {}
  async execute(
    filter: Partial<Company>,
    page: number,
    search: string,
    limit: number
  ): Promise<PaginatedCompanies> {
    const data = await this.companyRepository.getCompanyList(
      filter,
      page,
      search,
      limit
    );
    console.log('filtered companes', data);

    return data;
  }
}

import { CompanyListDTO, PaginatedCompanies } from '../../dtos/company.dto';
import { Company } from '../../../domain/entities/company.entity';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';

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
    // console.log('filtered companes', data);

    return data;
  }
}

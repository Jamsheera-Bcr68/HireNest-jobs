import { IBaseRepository } from './base-repository.interface';
import { Company } from '../entities/company.entity';
import { companyDto, CompanyStatus } from '../../applications/dtos/company.dto';
import { User } from '../entities/user.entity';
import { CompanyListDTO } from '../../applications/dtos/company.dto';
import { type PaginatedCompanies } from '../../applications/dtos/company.dto';

export interface ICompanyRepository extends IBaseRepository<Company> {
  findByUserId(userId: string): Promise<Company | null>;
  getCompanyList(
    filter: Partial<Company>,
    page: number,
    search: string,
    limit: number
  ): Promise<PaginatedCompanies>;

  getStatus(): Promise<CompanyStatus>;
}

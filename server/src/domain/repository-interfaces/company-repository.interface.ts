import { IBaseRepository } from './base-repository.interface';
import { Company } from '../entities/company.entity';
import {
  companyDto,
  CompanyFilterDto,
  CompanyStatus,
  PendingCompany,
} from '../../applications/dtos/company.dto';
import { chartDataDto } from '../types/chart.data.type';
import { User } from '../entities/user.entity';
import { CompanyListDTO } from '../../applications/dtos/company.dto';
import { type PaginatedCompanies } from '../../applications/dtos/company.dto';
import { StatusEnum } from '../enums/status.enum';

export interface ICompanyRepository extends IBaseRepository<Company> {
  findByUserId(userId: string): Promise<Company | null>;
  getCompanyList(
    filter: Partial<Company>,
    page: number,
    search: string,
    limit: number,
    sortBy?: string
  ): Promise<PaginatedCompanies>;

  getStatus(): Promise<CompanyStatus>;
  countByFilter(data: CompanyFilterDto): Promise<number>;

  getMonthlyCompanyCount(): Promise<chartDataDto[]>;
getCompanies(filter: {status:StatusEnum},limit:number):Promise<Company[]>

}

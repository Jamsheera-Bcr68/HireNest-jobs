import { IBaseRepository } from '../IBaseRepository';
import { Company } from '../../entities/company';
import { companyDto } from '../../../applications/Dtos/companyDto';
import { User } from '../../entities/User';
import { CompanyListDTO } from '../../../applications/Dtos/companyDto';

export interface ICompanyRepository extends IBaseRepository<Company> {
  findByUserId(userId: string): Promise<Company | null>;
  getCompanyList(filter: Partial<Company>): Promise<CompanyListDTO[] | []>
}

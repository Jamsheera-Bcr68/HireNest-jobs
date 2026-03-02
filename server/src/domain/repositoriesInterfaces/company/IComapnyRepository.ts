import { IBaseRepository } from '../IBaseRepository';
import { Company } from '../../entities/company';
import { companyDto } from '../../../applications/Dtos/companyDto';
import { User } from '../../entities/User';

export interface ICompanyRepository extends IBaseRepository<Company> {}

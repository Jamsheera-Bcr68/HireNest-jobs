import { CompanyListDTO } from "../../Dtos/companyDto";
import { Company } from "../../../domain/entities/company";
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';

export interface IGetCompaniesUseCase {
  execute(filter: Partial<Company>): Promise<CompanyListDTO[] | []>;
}
export class GetCompaniesUseCase implements IGetCompaniesUseCase {
  constructor(private companyRepository: ICompanyRepository) {}
  async execute(filter: Partial<Company>): Promise<CompanyListDTO[]> {
    const companies = await this.companyRepository.getCompanyList(filter);
    return companies;
  }
}

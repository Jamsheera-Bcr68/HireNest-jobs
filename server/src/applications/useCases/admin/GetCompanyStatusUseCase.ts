import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { CompanyStatus } from '../../Dtos/companyDto';
export interface IGetCompanyStatusUseCase {
  execute(): Promise<CompanyStatus>;
}

export class GetCompanyStatusUseCase implements IGetCompanyStatusUseCase {
  constructor(private companyRepository: ICompanyRepository) {}
  async execute(): Promise<CompanyStatus> {
    const status = await this.companyRepository.getStatus();
    console.log('status', status);

    return status;
  }
}

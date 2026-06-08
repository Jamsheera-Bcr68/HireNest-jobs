import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { CompanyStatus } from '../../dtos/company.dto';
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

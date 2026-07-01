import { AppError } from '../../domain/errors/app-error';
import { ICompanyRepository } from '../../domain/repository-interfaces/company-repository.interface';
import { generalMessages } from '../../shared/constants/messages/general.messages';
import { statusCodes } from '../../shared/enums/statuscodes';
import { ICompanyService } from '../interfaces/services/company.service';

export class CompanyService implements ICompanyService {
  constructor(private _companyRepository: ICompanyRepository) {}
  async getCompanyIdByUserId(userId: string): Promise<string> {
    const company = await this._companyRepository.findByUserId(userId);
    if (!company || !company.id)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    return company.id;
  }
}

import { Company } from '../../../../domain/entities/company';

import { UserRole } from '../../../../domain/enums/userEnums';
import { companyDto } from '../../../Dtos/companyDto';

export interface ICompanyRegisterUseCase {
  execute(
    payload: companyDto,
    userId: string,
    role: UserRole
  ): Promise<Company>;
}

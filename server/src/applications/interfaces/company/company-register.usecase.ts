import { Company } from '../../../domain/entities/company.entity';

import { UserRole } from '../../../domain/enums/user.enums';
import { companyDto } from '../../dtos/company.dto';

export interface ICompanyRegisterUseCase {
  execute(
    payload: Partial<companyDto>,
    userId: string,
    role: UserRole
  ): Promise<Company>;
}

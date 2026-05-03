import { Interview } from '../../../domain/entities/interview.entity';
import { UserRole } from '../../../domain/enums/userEnums';
import { IInterviewRepository } from '../../../domain/repositoriesInterfaces/interview.repository.interface';
import { IUpdateEntityUseCase } from '../../interfaces/usecases/update-entity.usecase.interface';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { authMessages } from '../../../shared/constants/messages/authMesages';

export class UpdateInterviewResultUsecase implements IUpdateEntityUseCase<
  Interview,
  void
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepositort: ICompanyRepository
  ) {}
  async execute(
    id: string,
    role: UserRole,
    userId: string,
    data: Partial<Interview>
  ): Promise<void> {
    const interview = await this._interviewRepository.findById(id);
    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );
    if (role !== UserRole.COMPANY)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const company = await this._companyRepositort.findByUserId(userId);
    if (!company)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    if (company.id !== interview.companyId)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    await this._interviewRepository.update(id, data);
  }
}

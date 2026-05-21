import { Interview } from '../../../domain/entities/interview.entity';
import { InterviewStatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-iInterfaces/company-repository.interface';
import { IInterviewRepository } from '../../../domain/repository-iInterfaces/interview.repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IUpdateEntityStatusUseCase } from '../../interfaces/usecases/update-entity-status.usecase.interface';

export class UpdateInterviewStatusUsecase implements IUpdateEntityStatusUseCase<
  Interview,
  InterviewStatusEnum
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(
    id: string,
    userId: string,
    role: UserRole,
    status: InterviewStatusEnum,
    reason?: string
  ): Promise<void | Interview> {
    console.log(
      'id,userId,role,status,reason',
      id,
      userId,
      role,
      status,
      reason
    );

    const interview = await this._interviewRepository.findById(id);
    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );

    if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
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
    }
    const data: Partial<Interview> = {};
    data.status = status;
    if (status == 'cancelled') {
      data.reasonForCancel = reason;
      data.cancelledBy = role;
    }
    const updated = this._interviewRepository.update(id, data);
  }
}

import { Interview } from '../../../domain/entities/interview.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { IUpdateEntityUseCase } from '../../interfaces/usecases/update-entity.usecase.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import {
  ApplicationStatusEnum,
  InterviewStatusEnum,
} from '../../../domain/enums/status.enum';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';

export class UpdateInterviewResultUsecase implements IUpdateEntityUseCase<
  Interview,
  void
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _applicationRepository: IApplicationRepository
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
    await Promise.all([
      this._applicationRepository.update(interview.applicationId, {
        status: ApplicationStatusEnum.INTERVIEW_COMPLETED,
      }),
      this._interviewRepository.update(id, {
        ...data,
        status: InterviewStatusEnum.COMPLETED,
      }),
    ]);
    // await this._interviewRepository.update(id, {
    //   ...data,
    //   status: InterviewStatusEnum.COMPLETED,
    // });
  }
}

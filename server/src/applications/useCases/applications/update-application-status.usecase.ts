import { Application } from '../../../domain/entities/application.entity';
import { IUpdateEntityStatusUseCase } from '../../interfaces/usecases/update-entity-status.usecase.interface';
import { ApplicationStatusEnum } from '../../../domain/enums/status.enum';
import { IApplicationRepository } from '../../../domain/repository-iInterfaces/application.repository.interface';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { partial } from 'zod/v4/core/util.cjs';
import { ApplicationMapper } from '../../mappers/application.mapper';
export class UpdateApplicationStatusUseCase implements IUpdateEntityStatusUseCase<
  Application,
  ApplicationStatusEnum
> {
  constructor(private _applicationRepository: IApplicationRepository) {}
  async execute(
    id: string,
    userId: string,
    role: UserRole,
    status: ApplicationStatusEnum,
    reason?: string
  ): Promise<void | Application> {
    const application = await this._applicationRepository.findById(id);
    if (!application)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Application'),
        statusCodes.NOTFOUND
      );

    const data = {} as Partial<Application>;
    if (status === ApplicationStatusEnum.WITHDRAWN) {
      if (role !== UserRole.CANDIDATE || userId !== application.candidateId) {
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      }
      data.status = status;
    } else {
      if (role !== UserRole.COMPANY) {
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      }
    }
    data.status = status;
    if (status === 'rejected') {
      data.rejectedReason = reason;
    }
    const updated = await this._applicationRepository.update(id, data);
    console.log('updated', updated);

    if (!updated)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Application'),
        statusCodes.NOTFOUND
      );
    return updated;
  }
}

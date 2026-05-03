import { Application } from '../../../domain/entities/application';
import { IUpdateEntityStatusUseCase } from '../../interfaces/usecases/update-entity-status.usecase.interface';
import { ApplicationStatusEnum } from '../../../domain/enums/statusEnum';
import { IApplicationRepository } from '../../../domain/repositoriesInterfaces/application.repository.interface';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { authMessages } from '../../../shared/constants/messages/authMesages';
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

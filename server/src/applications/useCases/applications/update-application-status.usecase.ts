import { Application } from '../../../domain/entities/application.entity';
import { IUpdateEntityStatusUseCase } from '../../interfaces/usecases/update-entity-status.usecase.interface';
import { ApplicationStatusEnum } from '../../../domain/enums/status.enum';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { partial } from 'zod/v4/core/util.cjs';
import { ApplicationMapper } from '../../mappers/application.mapper';
import { Notification } from '../../../domain/entities/notification.entity';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { INotificationService } from '../../services/notification.service';

export class UpdateApplicationStatusUseCase implements IUpdateEntityStatusUseCase<
  Application,
  ApplicationStatusEnum
> {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository,
    private _notifictionService: INotificationService
  ) {}
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
    if (!updated)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Application'),
        statusCodes.NOTFOUND
      );

    const company = await this._companyRepository.findById(
      application.companyId
    );
    if (!company)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    const job = await this._jobRepository.findById(application.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );

    const notificationData: Partial<Notification> = {
      userId: application.candidateId,
      type: NotificationType.APPLICATION_SHORTLISTED,
      message: notificationMessages[NotificationType.APPLICATION_SHORTLISTED]({
        companyName: company.companyName,

        jobTitle: job.title,
      }),
      title: 'Application Shortlisted',
    };
    await this._notifictionService.create(notificationData);
    console.log('updated', updated);

    return updated;
  }
}

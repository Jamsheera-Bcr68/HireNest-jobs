import { Interview } from '../../../domain/entities/interview.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { interviewDto } from '../../dtos/interview.dto';
import { IUpdateEntityUseCase } from '../../interfaces/usecases/update-entity.usecase.interface';
import { InterviewMapper } from '../../mappers/interview.mapper';
import { interviewInputDto } from '../../dtos/interview.dto';
import { INotificationService } from '../../services/notification.service';
import { NotificationInputDto } from '../../dtos/notification.dto';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { getIO } from '../../../infrastructure/socket';

export class UpdateInterviewUsecase implements IUpdateEntityUseCase<
  interviewInputDto,
  interviewDto
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository,
    private _userRepository: IUserRepository,
    private _notificationService: INotificationService
  ) {}

  async execute(
    id: string,
    role: UserRole,
    userId: string,
    data: Partial<interviewInputDto>
  ): Promise<interviewDto> {
    if (role !== UserRole.COMPANY) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }
   
    console.log('from usecaser,filter', id, data);

    const interview = await this._interviewRepository.findById(id);
    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );

    const company = await this._companyRepository.findByUserId(userId);
    if (!company)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    const { date, time, ...rest } = data;

    const scheduledAt = new Date(`${date}T${time}`);

    const updated = await this._interviewRepository.update(id, {
      ...rest,
      scheduledAt,
    });

    if (!updated)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );
    const job = await this._jobRepository.findById(interview.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );
    const candidate = await this._userRepository.findById(
      interview.candidateId
    );
    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );

    const notificationData: NotificationInputDto = {
      type: NotificationType.INTERVIEW_STATUS_UPDATED,
      title: `Interview Rescheduled`,
      message: notificationMessages[NotificationType.INTERVIEW_UPDATED]({
        title: job.title,
      }),
      userId: interview.candidateId,
    };

    await this._notificationService.create(notificationData);

    getIO().to(notificationData.userId).emit('notification', notificationData);

    return InterviewMapper.entityToInterviewDto(
      updated,
      job,
      candidate,
      company
    );
  }
}

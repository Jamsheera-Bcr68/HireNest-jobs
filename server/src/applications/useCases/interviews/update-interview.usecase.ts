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
import { interviewDetailDto, interviewDto } from '../../dtos/interview.dto';
import { IUpdateEntityUseCase } from '../../interfaces/usecases/update-entity.usecase.interface';
import { InterviewMapper } from '../../mappers/interview.mapper';
import { interviewInputDto } from '../../dtos/interview.dto';
import { INotificationService } from '../../services/notification.service';
import { NotificationInputDto } from '../../dtos/notification.dto';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { notificationMessages } from '../../../shared/constants/messages/notification.messages';
import { getIO } from '../../../infrastructure/socket';
import { IFileResolverService } from '../../services/file-url-resolver.service';
import { InterviewStatusEnum } from '../../../domain/enums/status.enum';

export class UpdateInterviewUsecase implements IUpdateEntityUseCase<
  interviewInputDto,
  interviewDetailDto
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository,
    private _userRepository: IUserRepository,
    private _notificationService: INotificationService,
    private _fileUrlResolverService: IFileResolverService
  ) {}

  async execute(
    id: string,
    role: UserRole,
    userId: string,
    data: Partial<interviewInputDto>
  ): Promise<interviewDetailDto> {
    if (role !== UserRole.COMPANY) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }

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
      
      if (interview.companyId !== company.id) {
  throw new AppError(
    authMessages.error.UNAUTHORIZED,
    statusCodes.UNAUTHERIZED
  );
}
    const { date, time, topics, ...rest } = data;

    const scheduledAt = new Date(`${date}T${time}`);
    const updatedTopics = topics ? topics?.split(',') : [];

const isScheduleChanged =
  scheduledAt.getTime() !== new Date(interview.scheduledAt).getTime();


    let requested = interview.isRescheduleRequested;
    let reason = interview.reasonForRescheduleRequest;
    if (
     requested &&
      isScheduleChanged
    ) {
      requested = false;
      reason = '';
    }
    if (
      interview.status === InterviewStatusEnum.NO_SHOW &&
      scheduledAt > new Date()
    ) {
      rest.status = InterviewStatusEnum.SCHEDULED;
    }
    const updated = await this._interviewRepository.update(id, {
      ...rest,
      topics: updatedTopics,
      scheduledAt,
      isRescheduleRequested: requested,
      reasonForRescheduleRequest: reason,
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

    const newNotification =
      await this._notificationService.create(notificationData);

    getIO().to(notificationData.userId).emit('notification', newNotification);
    const updatedInterview = InterviewMapper.toInterviewDetailDto(
      updated,
      job,
      candidate,
      company
    );

    const fileUrlResolver = this._fileUrlResolverService.createResolver();
    return {
      ...updatedInterview,
      candidateImageUrl: await fileUrlResolver(
        updatedInterview.candidateImageUrl,
        
      ),
      companyLogo: await fileUrlResolver(updatedInterview.companyLogo),
    };
  }
}

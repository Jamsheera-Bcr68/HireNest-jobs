import { partial } from 'zod/v4/core/util.cjs';
import { AppError } from '../../../domain/errors/AppError';
import { IApplicationRepository } from '../../../domain/repositoriesInterfaces/application.repository.interface';
import { IInterviewRepository } from '../../../domain/repositoriesInterfaces/interview.repository.interface';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { interviewInputDto, interviewDto } from '../../Dtos/interview.dto';
import { Interview } from '../../../domain/entities/interview.entity';
import { InterviewStatusEnum } from '../../../domain/enums/statusEnum';

export interface IScheduleInterviewUsecase {
  execute(data: interviewInputDto): Promise<string>;
}

export class ScheduleInterviewUsecase implements IScheduleInterviewUsecase {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _interviewRepository: IInterviewRepository
  ) {}
  async execute(data: interviewInputDto): Promise<string> {
    const { applicationId } = data;

    const application =
      await this._applicationRepository.findById(applicationId);
    if (!application)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Application'),
        statusCodes.NOTFOUND
      );
    const docData: Partial<Interview> = {};

    const {
      date,
      mode,
      location,
      notes,
      time,
      meetLink,
      duration,
      isAddlinkLater,
    } = data;

    const scheduledAt = new Date(`${date}T${time}`);
    const doc = {
      mode: mode,
      location: location,
      meetLink: meetLink,
      duration: duration,
      isAddlinkLater: isAddlinkLater,
      notes,
      scheduledAt,
      jobId: application.jobId,
      candidateId: application.candidateId,
      companyId: application.companyId,
      applicationId: applicationId,
      status: InterviewStatusEnum.SCHEDULED,
    };

    const newInterview = await this._interviewRepository.create(
      doc as Partial<Interview>
    );
    return newInterview.id;
  }
}

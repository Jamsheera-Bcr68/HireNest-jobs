import { ViolationEnum } from '../../../domain/enums/interview.enum';
import { AppError } from '../../../domain/errors/app-error';
import { IAiSessionRepository } from '../../../domain/repository-interfaces/ai-session.repository.interface';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { ReportInterviewViolationIntputDto } from '../../dtos/ai-session.-data.dto';

export interface IReportInteriewVioaltionUsecase {
  execute(data: ReportInterviewViolationIntputDto): Promise<void>;
}

export class ReportInterviewViloationUsecase implements IReportInteriewVioaltionUsecase {
  constructor(
    private _userRepository: IUserRepository,
    private _aiSessionRepository: IAiSessionRepository,

    private _jobRepository: IJobRepository,
    private _interviewRepository: IInterviewRepository
  ) {}
  async execute(data: ReportInterviewViolationIntputDto): Promise<void> {
    const { sessionId, candidateId, payload } = data;

    const [candidate, session] = await Promise.all([
      this._userRepository.findById(candidateId),
      this._aiSessionRepository.findById(sessionId),
    ]);

    if (!candidate) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );
    }

    if (!session) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Session'),
        statusCodes.NOTFOUND
      );
    }
    if (session.candidateId !== candidateId) {
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    }
    const [job, interview] = await Promise.all([
      this._jobRepository.findById(session.jobId),
      this._interviewRepository.findById(session.interviewId),
    ]);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );

    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );
    if (!session.violations) session.violations = [];
    session.violations.push({
      type: payload.type as ViolationEnum,
      at: new Date(payload.at),
      durationMs: payload.durationMs,
      questionId: payload.questionId,
      stage: payload.questionId ? 'questions' : 'introduction',
    });

    const updated = await this._aiSessionRepository.save(session.id, session);
  }
}

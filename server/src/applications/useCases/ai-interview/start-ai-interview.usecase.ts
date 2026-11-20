import { AIMeetingDto } from '../../dtos/ai-session.-data.dto';
import { UserRole } from '../../../domain/enums/user.enums';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IAiSessionRepository } from '../../../domain/repository-interfaces/ai-session.repository.interface';
import { Types } from 'mongoose';
import { ISkillRepository } from '../../../domain/repository-interfaces/skill-repository.interface';
import {
  AISessionStageEnum,
  AISessionStatusEnum,
} from '../../../domain/enums/interview.enum';
import { AiSession } from '../../../domain/entities/ai-session.entity';

export interface IStartAiInterviewUsecase {
  execute(
    meetId: string,
    userId: string,
    role: UserRole
  ): Promise<AIMeetingDto>;
}

const INTRODUCTION_QUESTION =
  'Could you introduce yourself and tell me about your experience?';

export class StartAiInterviewUsecase implements IStartAiInterviewUsecase {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _userRepository: IUserRepository,
    private _jobRepository: IJobRepository,
    private _aiSessionRepository: IAiSessionRepository,
    private _skillRepository: ISkillRepository
  ) {}

  async execute(
    meetId: string,
    userId: string,
    role: UserRole
  ): Promise<AIMeetingDto> {
    const interview = await this._interviewRepository.findOne({
      meetLink: meetId,
    });
    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );
    const [company, candidate, job] = await Promise.all([
      this._companyRepository.findById(interview.companyId),
      this._userRepository.findById(interview.candidateId),
      this._jobRepository.findById(interview.jobId),
    ]);

    if (!company || !company.id)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );

    if (!candidate || !candidate.id)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );

    if (role == UserRole.COMPANY) {
      if (userId !== company.userId)
        throw new AppError(
          generalMessages.errors.FORBIDDEN,
          statusCodes.FORBIDDEN
        );
    } else {
      if (userId !== candidate.id) {
        throw new AppError(
          generalMessages.errors.FORBIDDEN,
          statusCodes.FORBIDDEN
        );
      }
    }

    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );

    let session = await this._aiSessionRepository.findOne({
      interviewId: interview.id,
    });

    const allowed =
      role === UserRole.COMPANY
        ? userId === company.userId
        : userId === candidate.id;
    if (!allowed)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );

    if (!session) {
      const skills = await this._skillRepository.findByIds(job.skills);
      const topics = [
        ...new Set([
          ...(interview.topics ?? []),
          ...skills.map((s) => s.skillName),
        ]),
      ];
      const duration = Number(interview.duration);
      try {
        session = await this._aiSessionRepository.create({
          interviewId: interview.id,
          candidateId: candidate.id,
          jobId: job.id,
          status: AISessionStatusEnum.PENDING,

          completedAt: null,
          finalEvaluation: null,
          topics,
          duration,
          totalQuestions: Math.max(1, Math.floor(duration / 4) || 1),
          questions: [],
        });
      } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && error.code === 11000) {
          session = await this._aiSessionRepository.findOne({
            interviewId: interview.id,
          });
        } else {
          throw error;
        }
      }
    }
    if (!session)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('AI Session'),
        statusCodes.NOTFOUND
      );

    return {
      meeting: {
        meetingId: interview.meetLink,
        interviewId: interview.id,
        roleTitle: job.title,
        candidateName: candidate.name ?? '',
        companyName: company.companyName,
        scheduledAt: interview.scheduledAt.toISOString(),
        companyId: interview.companyId,
        candidateId: interview.candidateId,
        jobId: interview.jobId,
        roundName: interview.roundName,
      },
      aiInterview: this.buildAiInterview(session),
    };
  }
  private buildAiInterview(session: AiSession) {
    const introDone = !!session.introduction?.answer;

    let stage: AISessionStageEnum;
    if (session.status === AISessionStatusEnum.COMPLETED)
      stage = AISessionStageEnum.COMPLETED;
    else if (session.status === AISessionStatusEnum.PENDING)
      stage = AISessionStageEnum.WELCOME;
    else if (!introDone) stage = AISessionStageEnum.INTRODUCTION;
    else stage = AISessionStageEnum.QUESTIONS;

    let currentQuestion: {
      questionId: string | null;
      question: string;
      topic: string | null;
      questionNumber: number;
    } | null = null;

    if (
      stage === AISessionStageEnum.WELCOME ||
      stage === AISessionStageEnum.INTRODUCTION
    ) {
      currentQuestion = {
        questionId: null,
        question: INTRODUCTION_QUESTION,
        topic: null,
        questionNumber: 0,
      };
    } else if (stage === AISessionStageEnum.QUESTIONS) {
      const idx = session.questions.findIndex(
        (q) => q.status === AISessionStatusEnum.IN_PROGRESS
      );
      if (idx === -1)
        throw new AppError(
          generalMessages.errors.NOT_ACTIVE_QUESTION,
          statusCodes.CONFLICT
        );
      const q = session.questions[idx];
      currentQuestion = {
        questionId: q.id ?? null,
        question: q.question,
        topic: q.topic ?? null,
        questionNumber: idx + 1,
      };
    }

    return {
      sessionId: session.id,
      status: session.status,
      stage,
      totalQuestions: session.totalQuestions,
      currentQuestion,
    };
  }
}

import { AiSession } from '../../../domain/entities/ai-session.entity';
import { Interview } from '../../../domain/entities/interview.entity';
import { Job } from '../../../domain/entities/job.entity';
import {
  AISessionStageEnum,
  AISessionStatusEnum,
  InterviewResult,
} from '../../../domain/enums/interview.enum';
import { InterviewStatusEnum } from '../../../domain/enums/status.enum';
import { AppError } from '../../../domain/errors/app-error';
import { IAiSessionRepository } from '../../../domain/repository-interfaces/ai-session.repository.interface';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { INTERVIEW_INSTRUCTIONS } from '../../../shared/constants/messages/ai-interview-instructions';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import {
  FinalEvaluationInputDto,
  FinalEvaluationOutputDto,
  SubmitAiAnswerDto,
  SubmitAnswerOuputDto,
} from '../../dtos/ai-session.-data.dto';
import { IAIInterviewService } from '../../interfaces/services/ai.service.interface';
export interface ISubmitAnswerUsecase {
  execute(data: SubmitAiAnswerDto): Promise<SubmitAnswerOuputDto>;
}

type Ctx = {
  session: AiSession;
  answer: {
    originalName: string;
    mimeType: string;
    audio: Buffer<ArrayBufferLike>;
  };
  job: Job;
  interview: Interview;
};

const INTRO_QUESTION =
  'Could you introduce yourself and tell me about your experience?';

export class SubmitAnswerUsecase implements ISubmitAnswerUsecase {
  constructor(
    private _userRepository: IUserRepository,
    private _aiSessionRepository: IAiSessionRepository,
    private _aiInteriviewService: IAIInterviewService,
    private _jobRepository: IJobRepository,
    private _interviewRepository: IInterviewRepository
  ) {}
  async execute(data: SubmitAiAnswerDto): Promise<SubmitAnswerOuputDto> {
    const { sessionId, candidateId, answer, questionId = null, stage } = data;

    const candidate = await this._userRepository.findById(candidateId);
    if (!candidate) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );
    }
    const session = await this._aiSessionRepository.findById(sessionId);
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
    const job = await this._jobRepository.findById(session.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );
    const interview = await this._interviewRepository.findById(
      session.interviewId
    );
    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );

    // let currentQuestion: string | undefined;
    // if (!session.introduction && !questionId && stage === 'introduction') {
    //   currentQuestion =
    //     'Could you introduce yourself and tell me about your experience?';
    // } else {
    //   if (!questionId) {
    //     throw new AppError(
    //       generalMessages.errors.ID_NOT_FOUND('Question Id'),
    //       statusCodes.BADREQUEST
    //     );
    //   }
    //   currentQuestion = session.questions.find((q) =>
    //     q.id ? q.id === questionId : undefined
    //   )?.question;
    // }
    // if (!currentQuestion) {
    //   throw new AppError(
    //     generalMessages.errors.NOT_FOUND('Question'),
    //     statusCodes.BADREQUEST
    //   );
    // }

    // const evaludated =
    //   await this._aiInteriviewService.evaluateAnswerAndGenerateNextQuestion({
    //     ...answer,
    //     topics: session.topics,
    //     currentQuestion,
    //     questionCount: session.totalQuestions,
    //     jobTitle: job.title,
    //     instructions: INTERVIEW_INSTRUCTIONS(interview.roundName),
    //     previousQuestions: session.questions.map((q) => q.question),
    //     answeredQuestions: session.questions.length,
    //     jobDesc: job.description,
    //     roundName: interview.roundName,
    //   });
    // if (!evaludated) {
    //   throw new AppError(
    //     generalMessages.errors.AI_RESPONSE_NOT_FOUND,
    //     statusCodes.NOTFOUND
    //   );
    // }

    // let { nextQuestion, score, feedback, transcript, topic } = evaludated;

    // console.log(
    //   'nextQuestion, score, feedback, transcript,topic',
    //   nextQuestion,
    //   score,
    //   feedback,
    //   transcript,
    //   topic
    // );
    // if (score < 0) score = 0;
    // if (score > 10) score = 10;

    // if (!session.introduction) {
    //   session.introduction = {
    //     question: currentQuestion,
    //     answer: transcript,
    //     feedback: feedback,
    //     score: score,
    //     status: AISessionStatusEnum.COMPLETED,
    //   };
    // } else {
    //   const qArr = session.questions.map((q) =>
    //     q.status === AISessionStatusEnum.IN_PROGRESS
    //       ? {
    //           ...q,
    //           status: AISessionStatusEnum.COMPLETED,
    //           score,
    //           feedback,
    //           answer: transcript,
    //         }
    //       : q
    //   );

    //   session.questions = qArr;
    // }

    // const nextQ = {
    //   id: null,
    //   question: nextQuestion,
    //   status: AISessionStatusEnum.PENDING,
    //   topic,
    //   answer: null,
    //   feedback: null,
    //   score: null,
    // };

    // session.questions.push(nextQ);

    // const updated = await this._aiSessionRepository.save(session.id, session);
    // if (!updated) {
    //   throw new AppError(
    //     generalMessages.errors.NOT_FOUND('Ai Session'),
    //     statusCodes.NOTFOUND
    //   );
    // }
    // const newQuestion = updated.questions.find(
    //   (q) => q.question == nextQuestion
    // );
    // if (!newQuestion || !newQuestion.id)
    //   throw new AppError(
    //     generalMessages.errors.NOT_FOUND('Question'),
    //     statusCodes.NOTFOUND
    //   );

    // return {
    //   id: newQuestion.id,
    //   sessionId: updated.id,
    //   question: newQuestion.question,
    //   number: updated.questions.length,
    // };

    const ctx = { session, job, interview, answer };

    const introDone = !!session.introduction?.answer;
    return introDone
      ? this.submitQuestion(ctx, questionId)
      : this.submitIntroduction(ctx);
  }

  private async submitIntroduction(ctx: Ctx): Promise<SubmitAnswerOuputDto> {
    const { session } = ctx;

    const result = await this.evaluate(ctx, {
      currentQuestion: INTRO_QUESTION,
      previousQuestions: [INTRO_QUESTION],
      answeredQuestions: 0,
      isLastQuestion: false,
    });

    session.introduction = {
      question: INTRO_QUESTION,
      answer: result.transcript,
      feedback: result.feedback,
      score: result.score,
      status: AISessionStatusEnum.COMPLETED,
    };

    return this.pushNextQuestionAndSave(session, result);
  }

  private async submitQuestion(
    ctx: Ctx,
    questionId: string | null
  ): Promise<SubmitAnswerOuputDto> {
    const { session, interview } = ctx;

    if (!questionId)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Question Id'),
        statusCodes.BADREQUEST
      );

    const current = session.questions.find((q) => q.id === questionId);
    if (!current)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Question'),
        statusCodes.NOTFOUND
      );
    if (current.status === AISessionStatusEnum.COMPLETED)
      throw new AppError('Question already answered', statusCodes.CONFLICT);

    const answeredBefore = session.questions.filter(
      (q) => q.status === AISessionStatusEnum.COMPLETED
    ).length;
    const isLast = answeredBefore + 1 >= session.totalQuestions;

    const result = await this.evaluate(ctx, {
      currentQuestion: current.question,
      previousQuestions: [
        INTRO_QUESTION,
        ...session.questions.map((q) => q.question),
      ],
      answeredQuestions: answeredBefore,
      isLastQuestion: isLast,
    });

    current.status = AISessionStatusEnum.COMPLETED;
    current.answer = result.transcript;
    current.feedback = result.feedback;
    current.score = result.score;

    if (isLast) {
      session.status = AISessionStatusEnum.COMPLETED;
      session.completedAt = new Date();
      const saved = await this._aiSessionRepository.save(session.id, session);
      if (!saved)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Ai Session'),
          statusCodes.NOTFOUND
        );

      //update interview as completed
      const qanda = saved.questions.map((item) => {
        return {
          question: item.question ?? '',
          answer: item.answer ?? '',
          score: item.score ?? 0,
          feedback: item.feedback ?? '',
        };
      });
      const minimumScore = 5;
      let result: FinalEvaluationOutputDto | null = null;

      for (let attempt = 1; attempt <= 2; attempt++) {
        result = await this._aiInteriviewService.getFinalEvaluation({
          topics: saved.topics,
          questionsAndAnswers: qanda,
          minimumScore,
        });

        if (result) {
          break;
        }
      }

      if (!result) {
        await this._interviewRepository.save(interview.id, {
          ...interview,
          status: InterviewStatusEnum.COMPLETED,
          result: InterviewResult.PENDING,
        });
      } else {
        await this._interviewRepository.update(interview.id, {
          ...interview,
          status: InterviewStatusEnum.COMPLETED,
          score: result.score,
          feedback: result.feedback,
          result: result.result,
        });
      }

      return {
        completed: true,
        stage: AISessionStageEnum.COMPLETED,
        sessionId: saved.id,
        id: null,
        question: null,
        number: null,
      };
    }

    return this.pushNextQuestionAndSave(session, result);
  }

  private async evaluate(
    { session, job, interview, answer }: Ctx,
    p: {
      currentQuestion: string;
      previousQuestions: string[];
      answeredQuestions: number;
      isLastQuestion: boolean;
    }
  ) {
    const res =
      await this._aiInteriviewService.evaluateAnswerAndGenerateNextQuestion({
        ...answer,
        ...p,
        topics: session.topics,
        questionCount: session.totalQuestions,
        jobTitle: job.title,
        jobDesc: job.description,
        roundName: interview.roundName,
        instructions: INTERVIEW_INSTRUCTIONS(interview.roundName),
      });
    if (!res)
      throw new AppError(
        generalMessages.errors.AI_RESPONSE_NOT_FOUND,
        statusCodes.BAD_GATEWAY ?? 502
      );

    const score = Number.isFinite(res.score)
      ? Math.min(10, Math.max(0, res.score))
      : 0;
    return { ...res, score };
  }

  private async pushNextQuestionAndSave(
    session: AiSession,
    result: { nextQuestion: string; topic?: string | null }
  ): Promise<SubmitAnswerOuputDto> {
    if (!result.nextQuestion?.trim())
      throw new AppError(generalMessages.errors.AI_RESPONSE_NOT_FOUND, 502);

    session.questions.push({
      id: null,
      question: result.nextQuestion,
      status: AISessionStatusEnum.IN_PROGRESS,
      topic: result.topic ?? null,
      answer: null,
      feedback: null,
      score: null,
    });

    const updated = await this._aiSessionRepository.save(session.id, session);
    if (!updated)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Ai Session'),
        statusCodes.NOTFOUND
      );

    const q = updated.questions[updated.questions.length - 1]; // newest one, no find()
    if (!q?.id)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Question'),
        statusCodes.NOTFOUND
      );

    return {
      completed: false,
      stage: AISessionStageEnum.QUESTIONS,
      sessionId: updated.id,

      id: q.id,
      question: q.question,
      number: updated.questions.length,
    };
  }

  private updateInterviewCompleted() {}
}

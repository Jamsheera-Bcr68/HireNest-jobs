import { ProctorEvent } from '../../../applications/dtos/ai-session.-data.dto';

import { IUpdateEntityUseCase } from '../../../applications/interfaces/usecases/update-entity.usecase.interface';
import { IStartAiInterviewUsecase } from '../../../applications/useCases/ai-interview/start-ai-interview.usecase';
import { IReportInteriewVioaltionUsecase } from '../../../applications/useCases/ai-sessions/report-violation.usecase';
import { ISubmitAnswerUsecase } from '../../../applications/useCases/ai-sessions/submit-answer.usecase';
import { AiSession } from '../../../domain/entities/ai-session.entity';
import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { asyncHandler } from '../middleweres/async-handler';
import { Request, Response } from 'express';
export class AIISessionController {
  constructor(
    private _startAiInterviewUsecase: IStartAiInterviewUsecase,
    private _updateAisessionUsecase: IUpdateEntityUseCase<AiSession, void>,
    private _submitAiAnswerUseCase: ISubmitAnswerUsecase,
    private _reportInterviewViolationUsecase: IReportInteriewVioaltionUsecase
  ) {}
  startAiInterview = asyncHandler(async (req: Request, res: Response) => {
    const { meetId } = req.params;
    const user = req.user;

    if (!user || !user.userId) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }

    if (!meetId) {
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Meet id'),
        statusCodes.BADREQUEST
      );
    }

    const aimeetData = await this._startAiInterviewUsecase.execute(
      meetId,
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITY_DETAILS_FETCHED('Ai Interview'),
      data: aimeetData,
    });
  });

  updateAiSession = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const user = req.user;
    console.log(sessionId);
    if (!user || !user.userId) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }

    if (!sessionId) {
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Meet id'),
        statusCodes.BADREQUEST
      );
    }
    const data = req.body;
    console.log('update ai session daa', data);

    await this._updateAisessionUsecase.execute(
      sessionId,

      user.role,
      user.userId,
      data as Partial<AiSession>
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITY_DETAILS_FETCHED('Ai Interview'),
    });
  });

  submitAnswer = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const user = req.user;
    console.log(sessionId);
    if (!user || !user.userId) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }

    if (!sessionId) {
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Meet id'),
        statusCodes.BADREQUEST
      );
    }
    const audioFile = req.file;

    const data: { questionId: string; stage: string } = req.body;

    if (!audioFile) {
      throw new AppError(
        generalMessages.errors.AUDIO_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    }

    const candidateId = user.userId;

    const result = await this._submitAiAnswerUseCase.execute({
      candidateId,
      sessionId,
      questionId: data.questionId ?? null,
      stage: data.stage,
      answer: {
        audio: audioFile.buffer,
        mimeType: audioFile.mimetype,
        originalName: audioFile.originalname,
      },
    });

    res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ANSWER_SUBMITTED,
      data: result,
    });
  });

  reportViolation = asyncHandler(async (req: Request, res: Response) => {
    console.log('from report ai interview answer');
    const { sessionId } = req.params;
    const user = req.user;

    console.log(sessionId);
    if (!user || !user.userId) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }

    if (!sessionId) {
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Meet id'),
        statusCodes.BADREQUEST
      );
    }

    const payload: ProctorEvent = req.body;
    console.log('data from violation', payload);

    const candidateId = user.userId;

    const result = await this._reportInterviewViolationUsecase.execute({
      sessionId,
      candidateId,
      payload,
    });

    console.log('result from controller', result);

    res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.VIOLATION_REPORTED,
    });
  });
}

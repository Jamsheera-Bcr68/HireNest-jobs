import { AppError } from '../../../domain/errors/AppError';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { asyncHandler } from '../middleweres/async-handler';
import { Request, Response } from 'express';
import { IScheduleInterviewUsecase } from '../../../applications/useCases/interviews/schedule-interveiw.usecase';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { Application } from '../../../domain/entities/application';
import { ApplicationStatusEnum } from '../../../domain/enums/statusEnum';

import { IUpdateEntityStatusUseCase } from '../../../applications/interfaces/usecases/update-entity-status.usecase.interface';

export class InterviewController {
  constructor(
    private _scheduleInterviewUsecase: IScheduleInterviewUsecase,
    private _updateEntityStatusUsecase: IUpdateEntityStatusUseCase<
      Application,
      ApplicationStatusEnum
    >
  ) {}
  scheduleInterview = asyncHandler(async (req: Request, res: Response) => {
    console.log('from interview controller', req.body);

    const user = req.user;
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const interview = await this._scheduleInterviewUsecase.execute(req.body);
    await this._updateEntityStatusUsecase.execute(
      req.body.applicationId,
      user.userId,
      user.role,
      'interviewSheduled' as ApplicationStatusEnum
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITY_CREATED('Interview', 'Scheduled'),
      interview,
    });
  });
}

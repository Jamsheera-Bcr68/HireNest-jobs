import { AppError } from '../../../domain/errors/AppError';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { asyncHandler } from '../middleweres/async-handler';
import { Request, Response } from 'express';
import { UserRole } from '../../../domain/enums/userEnums';
import { IScheduleInterviewUsecase } from '../../../applications/useCases/interviews/schedule-interveiw.usecase';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { Application } from '../../../domain/entities/application';
import {
  ApplicationStatusEnum,
  InterviewStatusEnum,
} from '../../../domain/enums/statusEnum';
import { IGetEntitySatusUseCase } from '../../../applications/interfaces/usecases/get-entity-status.usecase.interface';
import { IUpdateEntityStatusUseCase } from '../../../applications/interfaces/usecases/update-entity-status.usecase.interface';
import {
  InterviewStatsCardType,
  InterviewFilterDto,
  InterviewListDto,
  interviewDetailDto,
  interviewDto,
} from '../../../applications/Dtos/interview.dto';
import {
  InterviewMode,
  InterviewResult,
} from '../../../domain/enums/interview.enum';
import { interviewInputDto } from '../../../applications/Dtos/interview.dto';
import { IGetAllEntitiesUsecase } from '../../../applications/interfaces/usecases/get-all-entities.usecase.interface';
import { Interview } from '../../../domain/entities/interview.entity';
import { success } from 'zod';
import { IGetEntityDetailsUsecase } from '../../../applications/interfaces/usecases/get-entity-details.usecase.inerface';
import { IUpdateEntityUseCase } from '../../../applications/interfaces/usecases/update-entity.usecase.interface';

export class InterviewController {
  constructor(
    private _scheduleInterviewUsecase: IScheduleInterviewUsecase,
    private _updateApplicationStatusUsecase: IUpdateEntityStatusUseCase<
      Application,
      ApplicationStatusEnum
    >,
    private _getInterviewsStatusUsecase: IGetEntitySatusUseCase<InterviewStatsCardType>,
    private _getInterviewsUsecase: IGetAllEntitiesUsecase<
      InterviewListDto,
      InterviewFilterDto
    >,
    private _updateInterviewStatusUsecase: IUpdateEntityStatusUseCase<
      Interview,
      InterviewStatusEnum
    >,
    private _getInterviewDetailsUsecase: IGetEntityDetailsUsecase<interviewDetailDto>,
    private _updateInterviewUsecase: IUpdateEntityUseCase<
      Interview,
      interviewDto
    >,
    private _updateInterviewResultUsecase: IUpdateEntityUseCase<Interview, void>
  ) {}
  scheduleInterview = asyncHandler(async (req: Request, res: Response) => {
    // console.log('from interview controller', req.body);

    const user = req.user;
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const interview = await this._scheduleInterviewUsecase.execute(req.body);
    await this._updateApplicationStatusUsecase.execute(
      req.body.applicationId,
      user.userId,
      user.role,
      'interviewScheduled' as ApplicationStatusEnum
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITY_CREATED('Interview', 'Scheduled'),
      interview,
    });
  });

  updateInterview = asyncHandler(async (req: Request, res: Response) => {
    console.log('from interview controller', req.body);

    const user = req.user;
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const { id } = req.params;
    const data = req.body;

    const interview = await this._updateInterviewUsecase.execute(
      id,
      user.role,
      user.userId,
      data
    );
    console.log('updated interview', interview);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITY_CREATED('Interview', 'Updated'),
      interview,
    });
  });

  getSatuses = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('User'),
        statusCodes.NOTFOUND
      );
    }
    const statuses = await this._getInterviewsStatusUsecase.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.STATUS_FETCHED('Interview'),
      statuses,
    });
  });

  getInterviews = asyncHandler(async (req: Request, res: Response) => {
    type DateRangeType = {
      startDate: string;
      endDate: string;
    } | null;
    const {
      search,
      status,
      page,
      limit,
      mode,
      sortby,
      result,
      startDate,
      endDate,
    } = req.query;

    console.log('req.query', req.query);
    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('User'),
        statusCodes.NOTFOUND
      );
    }

    let q = {} as Partial<InterviewFilterDto>;
    if (user.role == UserRole.CANDIDATE) {
      q.candidateId = user.userId;
    }
    if (search) {
      q.search = search as string;
    }
    if (startDate) {
      const range = {
        startDate: startDate as string,
        endDate: endDate as string,
      };
      q.dateRange = range;
    }
    if (sortby) {
      q.sortBy = sortby as string;
    }
    if (mode) {
      q.mode = mode as InterviewMode;
    }
    if (status) {
      q.status = status as InterviewStatusEnum;
    }
    if (result) {
      q.result = result as InterviewResult;
    }
    if (page) {
      q.page = Number(page);
    }
    if (limit) {
      q.limit = Number(limit);
    }
    console.log('q from controller', q);

    const { interviews, totalDocs } = await this._getInterviewsUsecase.execute(
      q,
      user.role,
      user.userId
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.STATUS_FETCHED('Interviews'),
      interviews,
      totalDocs,
    });
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('User'),
        statusCodes.NOTFOUND
      );
    }

    const { id } = req.params;
    if (!id)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Interviw'),
        statusCodes.BADREQUEST
      );
    const { status, reason } = req.body;
    console.log(' req.body', req.body);

    await this._updateInterviewStatusUsecase.execute(
      id,
      user.userId,
      user.role,
      status,
      reason
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.STATUS_UPDATED('Interview', status),
    });
  });

  getInterview = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('User'),
        statusCodes.NOTFOUND
      );
    }

    const { id } = req.params;
    if (!id)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Interviw'),
        statusCodes.BADREQUEST
      );

    const interview = await this._getInterviewDetailsUsecase.execute(
      id,
      user.userId,
      user.role
    );
    console.log('interview from controller', interview);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITY_DETAILS_FETCHED('Interview'),
      interview,
    });
  });

  updateInterviewResult = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('User'),
        statusCodes.NOTFOUND
      );
    }

    const { id } = req.params;
    if (!id)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Interviw'),
        statusCodes.BADREQUEST
      );

    console.log(' req.body', req.body);

    const { data } = req.body;

    await this._updateInterviewResultUsecase.execute(
      id,

      user.role,
      user.userId,
      data
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.RESULT_UPDATED('Interview'),
    });
  });
}

import { asyncHandler } from '../middleweres/async-handler';
import { Request, Response } from 'express';
import { IApplyJobUseCase } from '../../../applications/useCases/candidate/apply-job.usecase';
import { AppError } from '../../../domain/errors/AppError';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { Application } from '../../../domain/entities/application';
import { applicationMessage } from '../../../shared/constants/messages/application.messages';
import { IGetEntityStatusUseCase } from '../../../applications/interfaces/admin/IGetEntityStatusUseCase';
import { IGetAllEntitiesUsecase } from '../../../applications/interfaces/usecases/get-all-entities.usecase.interface';
import {
  ApplicationListDto,
  ApplicationFilterDto,
  ApplicationStatsCardType,
} from '../../../applications/Dtos/application.dto';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { UserRole } from '../../../domain/enums/userEnums';
import { ApplicationStatusEnum } from '../../../domain/enums/statusEnum';
import { JobType } from '../../../domain/types/jobTypes';
import { ApplicationDetailsDto } from '../../../applications/Dtos/application.dto';
import { IGetEntityDetailsUsecase } from '../../../applications/interfaces/usecases/get-entity-details.usecase.inerface';
import { IUpdateEntityStatusUseCase } from '../../../applications/interfaces/usecases/update-entity-status.usecase.interface';
import { ApplicationMapper } from '../../../applications/mappers/application.mapper';

export class ApplicationController {
  constructor(
    private _applyJobUseCase: IApplyJobUseCase,
    private _getAppStatusUseCase: IGetEntityStatusUseCase<ApplicationStatsCardType>,
    private _getAllApplications: IGetAllEntitiesUsecase<
      ApplicationListDto,
      ApplicationFilterDto
    >,
    private _getApplicationDetailsUsecase: IGetEntityDetailsUsecase<ApplicationDetailsDto>,
    private _updateEntityStatusUsecase: IUpdateEntityStatusUseCase<
      Application,
      ApplicationStatusEnum
    >
  ) {}

  applyJob = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    }
    const { jobId } = req.params;
    const { resumeId } = req.body;
    console.log('from application controller', jobId, resumeId);
    const applicationId = await this._applyJobUseCase.execute(
      jobId,
      resumeId,
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: applicationMessage.success.JOB_APPLIED,
      jobId,
    });
  });

  getApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    }
    const appStatus = await this._getAppStatusUseCase.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.STATUS_FETCHED('Application'),
      appStatus,
    });
  });

  getApplications = asyncHandler(async (req: Request, res: Response) => {
    const { search, status, page, limit, jobType, sortBy } = req.query;

    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    }

    let q = {} as Partial<ApplicationFilterDto>;
    if (user.role == UserRole.CANDIDATE) {
      q.candidateId = user.userId;
    }
    if (search) {
      q.search = search as string;
    }
    if (sortBy) {
      q.sortBy = sortBy as string;
    }
    if (jobType) {
      q.jobType = jobType as JobType;
    }
    if (status) {
      q.status = status as ApplicationStatusEnum;
    }
    if (page) {
      q.page = Number(page);
    }
    if (limit) {
      q.limit = Number(limit);
    }
    const { applications, totalDocs } =
      await this._getAllApplications.execute(q);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.STATUS_FETCHED('Application'),
      applications,
      totalDocs,
    });
  });

  getApplicationDetails = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    }
    if (!id)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Application'),
        statusCodes.NOTFOUND
      );

    const application = await this._getApplicationDetailsUsecase.execute(
      id,
      user.userId,
      user.role
    );
    console.log('application', application);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITY_DETAILS_FETCHED('Application'),
      application,
    });
  });

  updateAppStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    }
    if (!id)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Application'),
        statusCodes.NOTFOUND
      );
    const { status, reason } = req.body;
    console.log('status,reason', status, reason);

    const app = await this._updateEntityStatusUsecase.execute(
      id,
      user.userId,
      user.role,
      status,
      reason
    );
    const timeline = ApplicationMapper.getTimeline(app!);
    console.log('timeline', timeline);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.STATUS_UPDATED('Application', status),
      timeline: timeline.timeline,
    });
  });
}

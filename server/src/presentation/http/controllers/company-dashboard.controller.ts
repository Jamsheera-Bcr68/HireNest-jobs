import {  IDashboardDataListUsecase } from '../../../applications/interfaces/dashboard/dashboard-data-list.usecase.interface';
import { IDashboardCardDataUsecase } from '../../../applications/interfaces/dashboard/status-card-data.usecase.interface';
import {
  CompanyDashboardCardsDto,
  DashboardInterview,
  DashboardJobData,
  PendingActivityDto,
  RecentActivityDto,
} from '../../../applications/types/company-dashboard.types';
import { CompanyDashboardStatusCardDataUsecase } from '../../../applications/useCases/company/dashboard/get-statuscard-data.usecase';
import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { ICompanyDashboardJobDataUsecase } from '../../../applications/useCases/company/dashboard/dashboard-jobdata.usecase';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { asyncHandler } from '../middleweres/async-handler';
import { Request, Response } from 'express';

import { CompanyApplicationChartData } from '../../../applications/types/company-dashboard.types';
import { ICompanyDashboardAppDataUsecase } from '../../../applications/useCases/company/dashboard/get-application-data.usecase';

export class CompanyDashboardController {
  constructor(
    private _getDashboardStatusCardDataUsecase: IDashboardCardDataUsecase<CompanyDashboardCardsDto>,
    private _getApplicationDataUsecase: ICompanyDashboardAppDataUsecase,
    private _getDashboardTopJobsUsecase:ICompanyDashboardJobDataUsecase,
    private _getDashboardInterviewUsecase:IDashboardDataListUsecase<DashboardInterview>,
    private _recentActivitiesUsecase:IDashboardDataListUsecase<RecentActivityDto>,
    private _pendingActionsUsecase:IDashboardDataListUsecase<PendingActivityDto>,
  ) {}
  getStatusData = asyncHandler(async (req: Request, res: Response) => {
    console.log('from getStatusData');

    const user = req.user;
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const data = await this._getDashboardStatusCardDataUsecase.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      statusData: data,
    });
  });

  getApplicationData = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const data = await this._getApplicationDataUsecase.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      appData: data,
    });
  });

  getJobData = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const data = await this._getDashboardTopJobsUsecase.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      jobData: data,
    });
  });

  getInterviewData = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const data = await this._getDashboardInterviewUsecase.execute(
      user.userId,
      user.role
    );
   // console.log('interview data', data);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      data,
    });
  });

  getRecentActivities = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const data = await this._recentActivitiesUsecase.execute(
      user.userId,
      user.role
    );
 

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      data,
    });
  });

  getPendingActivities = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const data = await this._pendingActionsUsecase.execute(
      user.userId,
      user.role
    );
    console.log('pending activities data', data);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      data,
    });
  });
}

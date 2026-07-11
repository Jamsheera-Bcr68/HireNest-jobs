import { asyncHandler } from '../middleweres/async-handler';
import { Request, Response } from 'express-serve-static-core';
import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { IDashboardCardDataUsecase } from '../../../applications/interfaces/dashboard/status-card-data.usecase.interface';
import { CandidateDashboardCardsDto } from '../../../applications/types/candidate-dashboard.types';
import { IDashboardAppDataUsecase } from '../../../applications/useCases/candidate/dashboard/get-dashboard-appData.usecase';
import { IUpcomingInteriewUsecase } from '../../../applications/useCases/interviews/get-upcoming-interview.usecase';
import { IDashboardProfileDataUsecase } from '../../../applications/useCases/candidate/dashboard/get-dashboard-profile-data.usecase';
import { IRecomentedJobsUsecase } from '../../../applications/useCases/candidate/dashboard/recomented-jobs.usecase';

export class CandidateDashboardController {
  constructor(
    private _candidateDashboardStatusDataUsecase: IDashboardCardDataUsecase<CandidateDashboardCardsDto>,
    private _candidateDashboardAppDataUsecase:IDashboardAppDataUsecase,
    private _getUpcomingInterviewUsecase:IUpcomingInteriewUsecase,
    private _dashboardProfileDataUsecase:IDashboardProfileDataUsecase,
    private _recomentedJobUsecase:IRecomentedJobsUsecase
  ) {}
  statuscardData = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const statusData = await this._candidateDashboardStatusDataUsecase.execute(
      user.userId,
      user.role
    );
    console.log(`candidateDashboardStatusData`, statusData);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      statusData,
    });
  });

  getAppData = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const appDetais = await this._candidateDashboardAppDataUsecase.execute(
      user.userId,
      user.role
    );
    //console.log(`candidateDashboard app details`, appDetais);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      appData: appDetais,
    });
  });

  getUpcomingInterview = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const interview = await this._getUpcomingInterviewUsecase.execute(
      user.userId,
      user.role
    );
   // console.log(`candidateDashboard upcoming interview details`, interview);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      interview: interview,
    });
  });
  

  getProfileData = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const profile = await this._dashboardProfileDataUsecase.execute(
      user.userId,
      user.role
    );
    console.log(`candidateDashboard  profile details`, profile);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
     profileData:profile
    });
  });


  getRecomentedJobs = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const jobs = await this._recomentedJobUsecase.execute(
      user.userId,
      user.role
    );
    console.log(`candidateDashboard recomented jobs`, jobs);

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
     recomented:jobs
    });
  });
}

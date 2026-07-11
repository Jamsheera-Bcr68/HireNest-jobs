import { success } from 'zod';
import { IDashboardCardDataUsecase } from '../../../../applications/interfaces/dashboard/status-card-data.usecase.interface';
import {
  AdminDashboardCardsDto,
  AdminCompanyJobChartDto,
  UserDistributionChartData,
  ApplcationDistributionChartData,
  InterviewData,
} from '../../../../applications/types/admin-dashboard.types';
import { AppError } from '../../../../domain/errors/app-error';
import { authMessages } from '../../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { asyncHandler } from '../../middleweres/async-handler';
import { Request, Response } from 'express';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { IDashboardChartDataUsecase } from '../../../../applications/interfaces/dashboard/chart-data.usecase.interface';
import { IIndustryWiseJobCountUsecase } from '../../../../applications/useCases/admin/dashoard/job-count-by-industry.usecase';
import { ApplcationDistributionUsecase } from '../../../../applications/useCases/admin/dashoard/application-distributiion.usecase';
import { IGetCompaniesUseCase } from '../../../../applications/useCases/admin/get-companies.usecase';
import { IGetAllJobsUseCase } from '../../../../applications/useCases/candidate/get-jobs.usecase';
import { StatusEnum } from '../../../../domain/enums/status.enum';
import { IGetPendingCompaniesUsecase } from '../../../../applications/useCases/admin/dashoard/pending-companies.usecase';
import { IGetReportedJobsUsecase } from '../../../../domain/get-reported-jobs.usecase';

export class AdminDashboardController {
  constructor(
    private _adminDashboardStatusDataUsecase: IDashboardCardDataUsecase<AdminDashboardCardsDto>,
    private _companyJobChartData: IDashboardChartDataUsecase<AdminCompanyJobChartDto>,
    private _industryWistPostCountusecase: IIndustryWiseJobCountUsecase,
    private _userDistributionData: IDashboardChartDataUsecase<UserDistributionChartData>,
    private _appDistributionDataUsecase: IDashboardChartDataUsecase<ApplcationDistributionChartData>,
    private _interviewDataUsecase: IDashboardChartDataUsecase<InterviewData>,
    private _getPendingCompaniesUsecase: IGetPendingCompaniesUsecase,
    private _getReportedJobsUsecase: IGetReportedJobsUsecase
  ) {}

  getStatusCardData = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const statusData = await this._adminDashboardStatusDataUsecase.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      statusData,
    });
  });

  getCompanyJobChartData = asyncHandler(async (req: Request, res: Response) => {
    //('from getStatusCardData');
    const user = req.user;
    console.log('user', user);
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const chartData = await this._companyJobChartData.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      chartData,
    });
  });

  getIndustrywiseJobCount = asyncHandler(
    async (req: Request, res: Response) => {
      //  console.log('from getStatusCardData');
      const user = req.user;
      // console.log('user', user);
      if (!user)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );

      const postData = await this._industryWistPostCountusecase.execute(
        user.userId,
        user.role
      );

      return res.status(statusCodes.OK).json({
        success: true,
        message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
        postData,
      });
    }
  );

  getUserDistribution = asyncHandler(async (req: Request, res: Response) => {
    // console.log('from getStatusCardData');
    const user = req.user;
    // console.log('user', user);
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const userData = await this._userDistributionData.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      userData,
    });
  });

  getApplicationDistribution = asyncHandler(
    async (req: Request, res: Response) => {
      // console.log('from pplication distribution');
      const user = req.user;

      if (!user)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );

      const appData = await this._appDistributionDataUsecase.execute(
        user.userId,
        user.role
      );

      return res.status(statusCodes.OK).json({
        success: true,
        message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
        appData,
      });
    }
  );

  getInterviewData = asyncHandler(async (req: Request, res: Response) => {
  //  console.log('from interview distribution');
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const interviewData = await this._interviewDataUsecase.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      interviewData,
    });
  });

  getPendingCompanies = asyncHandler(async (req: Request, res: Response) => {
    //console.log('from interview distribution');
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const pendingCompanies = await this._getPendingCompaniesUsecase.execute(
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      companies: pendingCompanies,
    });
  });

  getReportedJobs = asyncHandler(async (req: Request, res: Response) => {
    //console.log('from interview distribution');
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const jobs = await this._getReportedJobsUsecase.execute(user.role);
   // console.log('controlle pending jobs',jobs);
    

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.DASHBOARD_STATUS_DATA_FETCHED,
      jobs,
    });
  });
}

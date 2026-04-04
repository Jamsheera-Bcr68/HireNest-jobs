import { NextFunction, Request, Response } from 'express';
import { IUpdateJobStatusUseCase } from '../../../../applications/useCases/job/update-job-status.usecase';
import { asyncHandler } from '../../middleweres/async-handler';
import { AppError } from '../../../../domain/errors/AppError';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { jobMessages } from '../../../../shared/constants/messages/jobMessages';
import { IGetPostSatusUseCase } from '../../../../applications/useCases/company/company-post-status.usecase';
import { IGetAllJobsUseCase } from '../../../../applications/useCases/candidate/GetAllJobsUseCase';
import { IGetJobDetailsUseCase } from '../../../../applications/useCases/candidate/GetJobDetailsUseCase';

export class AdminJobController {
  constructor(
    private updateJobStatusUseCase: IUpdateJobStatusUseCase,
    private getPostStatusUseCase: IGetPostSatusUseCase,
    private getAllJobsUseCase: IGetAllJobsUseCase,
    private getJobDetailsUseCase: IGetJobDetailsUseCase
  ) {}
  getJobStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user)
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
    const statusData = await this.getPostStatusUseCase.execute(
      user.userId,
      user.role
    );
    console.log('status data', statusData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_STATUS_FETCHED,
      statusData: statusData,
    });
  });
  getJobs = asyncHandler(async (req: Request, res: Response) => {
    let { search, page, limit, sortBy, ...rest } = req.query;
    console.log('from getjob controller', rest);

    const jobRes = await this.getAllJobsUseCase.execute(
      rest,

      Number(limit),
      Number(page),
      search as { job: string; location: string },
      sortBy?.toString().toLowerCase()
    );
    const { jobs, totalDocs } = jobRes;
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_FETCHED,
      jobs,
      totalDocs,
    });
  });
  updateJobStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    const data = req.body;
    console.log('form controller', data);

    console.log('data[status]', data.status);

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    console.log('from update status', id, data);
    await this.updateJobStatusUseCase.execute(id, user.userId, user.role, data);
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_STATUS_UPDATED(data.status),
    });
  });

  getJobDetails = asyncHandler(async (req: Request, res: Response) => {
    const jobId = req.params.id;
    //console.log('job id id ', jobId);

    const jobDetails = await this.getJobDetailsUseCase.execute(jobId);
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_DETAILS_FETCHED,
      jobDetails,
    });
  });
}

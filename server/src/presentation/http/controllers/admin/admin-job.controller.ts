import { Request, Response } from 'express';
import { IUpdateJobStatusUseCase } from '../../../../applications/useCases/job/update-job-status.usecase';
import { asyncHandler } from '../../middleweres/async-handler';
import { AppError } from '../../../../domain/errors/app-error';
import { authMessages } from '../../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { jobMessages } from '../../../../shared/constants/messages/job.messages';
import { IGetPostSatusUseCase } from '../../../../applications/useCases/company/company-post-status.usecase';
import { IGetAllJobsUseCase } from '../../../../applications/useCases/candidate/get-jobs.usecase';
import { IGetJobDetailsUseCase } from '../../../../applications/useCases/candidate/get-job.usecase';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';

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
    const { jobId } = req.params;
    const data = req.body;
    console.log('form controller', data);

    console.log('data[status]', data.status);

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    console.log('from update status', jobId, data);
    await this.updateJobStatusUseCase.execute(
      jobId,
      user.userId,
      user.role,
      data
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_STATUS_UPDATED(data.status),
    });
  });

  getJobDetails = asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    console.log('job id id ', jobId);
    if (!jobId)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Job'),
        statusCodes.BADREQUEST
      );
    const jobDetails = await this.getJobDetailsUseCase.execute(jobId);
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_DETAILS_FETCHED,
      jobDetails,
    });
  });
}

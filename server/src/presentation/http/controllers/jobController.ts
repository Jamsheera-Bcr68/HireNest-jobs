import { Request, Response, NextFunction } from 'express';
import { JobReqDto } from '../validators/company/jobValidation';
import { asyncHandler } from '../middleweres/async-handler';
import { JobMapper } from '../mappers/jobMapper';
import { AppError } from '../../../domain/errors/AppError';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { ICrateJobUseCase } from '../../../applications/useCases/job/createJobUseCase';
import { IGetJobDetailsUseCase } from '../../../applications/useCases/candidate/GetJobDetailsUseCase';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { UserRole } from '../../../domain/enums/userEnums';
import { IGetAllJobsUseCase } from '../../../applications/useCases/candidate/GetAllJobsUseCase';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { IReportJobUseCase } from '../../../applications/useCases/candidate/report-job.usecase';
import { ISaveJobUseCase } from '../../../applications/useCases/candidate/save-job.usecase';
import { IRemoveSavedJobUseCase } from '../../../applications/useCases/candidate/unsave-job.usecase';
import { IGetSavedJobsUseCase } from '../../../applications/useCases/candidate/get-saved-jobs.usecase';

export class JobController {
  constructor(
    private createJobUseCase: ICrateJobUseCase,
    private getAllJobsUseCase: IGetAllJobsUseCase,
    private getJobDetailsUseCase: IGetJobDetailsUseCase,
    private reportJobUseCase: IReportJobUseCase,
    private saveJobUseCase: ISaveJobUseCase,
    private removeSavedJobUseCase: IRemoveSavedJobUseCase,
    private getSavedJobsUseCase: IGetSavedJobsUseCase
  ) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    // console.log('from jobcontroller');
    const payload: JobReqDto = req.body;

    const user = req.user;
    //  console.log('user from job controller', user);

    try {
      if (!user || !user.userId || user.role !== UserRole.COMPANY) {
        throw new AppError(
          userMessages.error.NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }
      const jobData = JobMapper.toJobDto(payload);
      const job = await this.createJobUseCase.execute(
        jobData,
        user.userId,
        user.role
      );
      return res
        .status(statusCodes.OK)
        .json({ success: true, message: jobMessages.success.JOB_CREATED, job });
    } catch (error) {
      next(error);
    }
  };

  getJobs = async (req: Request, res: Response, next: NextFunction) => {
    let { search, page, limit, sortBy, ...rest } = req.query;

    try {
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
    } catch (error: any) {
      next(error);
    }
  };
  getSavedJobs = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;
      if (!user || !user.userId) {
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.NOTFOUND
        );
      }
      let { search, page, limit, sortBy, ...rest } = req.query;

      const jobRes = await this.getSavedJobsUseCase.execute(
        user.userId,
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
    }
  );
  getJobDetails = async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.id;
    //console.log('job id id ', jobId);
    try {
      const jobDetails = await this.getJobDetailsUseCase.execute(jobId);
      return res.status(statusCodes.OK).json({
        success: true,
        message: jobMessages.success.JOB_DETAILS_FETCHED,
        jobDetails,
      });
    } catch (error: any) {
      next();
    }
  };

  reportJob = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    console.log('req.body', data);
    const user = req.user;
    if (!user)
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
    const jobId = req.params.id;
    console.log('job id ', jobId);

    if (!jobId)
      throw new AppError(
        jobMessages.error.JOBID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    await this.reportJobUseCase.execute(jobId, data, user.userId);
    return res
      .status(statusCodes.OK)
      .json({ success: true, message: jobMessages.success.JOB_REPORTED });
  });

  saveJob = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user)
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
    const jobId = req.params.id;
    console.log('job id ', jobId);

    if (!jobId)
      throw new AppError(
        jobMessages.error.JOBID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    const savedJobs = await this.saveJobUseCase.execute(jobId, user.userId);
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_SAVED,
      savedJobs,
    });
  });

  unSaveJob = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user)
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
    const jobId = req.params.id;
    console.log('job id ', jobId);

    if (!jobId)
      throw new AppError(
        jobMessages.error.JOBID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    const savedJobs = await this.removeSavedJobUseCase.execute(
      jobId,
      user.userId
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_UNSAVED,
      savedJobs,
    });
  });
}

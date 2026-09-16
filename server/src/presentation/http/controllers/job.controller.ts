import { Request, Response } from 'express';
import { JobReqDto } from '../validators/company/job-validation';
import { asyncHandler } from '../middleweres/async-handler';
import { JobMapper } from '../mappers/job.mapper';
import { AppError } from '../../../domain/errors/app-error';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { ICrateJobUseCase } from '../../../applications/useCases/job/create-job.usecase';
import { IGetJobDetailsUseCase } from '../../../applications/useCases/candidate/get-job.usecase';
import { jobMessages } from '../../../shared/constants/messages/job.messages';
import { UserRole } from '../../../domain/enums/user.enums';
import { IGetAllJobsUseCase } from '../../../applications/useCases/job/get-jobs.usecase';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { IReportJobUseCase } from '../../../applications/useCases/candidate/report-job.usecase';
import { ISaveJobUseCase } from '../../../applications/useCases/candidate/save-job.usecase';
import { IRemoveSavedJobUseCase } from '../../../applications/useCases/candidate/unsave-job.usecase';
import { IGetSavedJobsUseCase } from '../../../applications/useCases/candidate/get-saved-jobs.usecase';
import { IGetPostSatusUseCase } from '../../../applications/useCases/company/company-post-status.usecase';
import { IUpdateJobStatusUseCase } from '../../../applications/useCases/job/update-job-status.usecase';
import { IUpdateJobUseCase } from '../../../applications/useCases/job/update-job.usecase';
import { JobUpdateDto } from '../../../applications/dtos/job.dto';

export class JobController {
  constructor(
    private _createJobUseCase: ICrateJobUseCase,
    private _getAllJobsUseCase: IGetAllJobsUseCase,
    private _getJobDetailsUseCase: IGetJobDetailsUseCase,
    private _reportJobUseCase: IReportJobUseCase,
    private _saveJobUseCase: ISaveJobUseCase,
    private _removeSavedJobUseCase: IRemoveSavedJobUseCase,
    private _getSavedJobsUseCase: IGetSavedJobsUseCase,
    private _companyPostStatusUseCase: IGetPostSatusUseCase,
    private _updateJobStatusUseCase: IUpdateJobStatusUseCase,
    private _updateJobUseCase: IUpdateJobUseCase
  ) {}
  create = asyncHandler(async (req: Request, res: Response) => {
    // console.log('from jobcontroller');
    const payload: JobReqDto = req.body;

    const user = req.user;
      console.log('user from job controller', user);

    if (!user || !user.userId || user.role !== UserRole.COMPANY) {
      throw new AppError(
        userMessages.error.NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    const jobData = JobMapper.toJobDto(payload);
    const job = await this._createJobUseCase.execute(
      jobData,
      user.userId,
      user.role
    );
    return res
      .status(statusCodes.OK)
      .json({ success: true, message: jobMessages.success.JOB_CREATED, job });
  });

  getJobs = asyncHandler(async (req: Request, res: Response) => {
    let { search, page, limit, sortBy, ...rest } = req.query;
      const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
    }
   // console.log('from getjob controller', rest);

    const jobRes = await this._getAllJobsUseCase.execute(user.userId,user.role,
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

  getSavedJobs = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
    }
    let { search, page, limit, sortBy, ...rest } = req.query;

    const jobRes = await this._getSavedJobsUseCase.execute(
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
  });

  getJobDetails = asyncHandler(async (req: Request, res: Response) => {
    const {jobId} = req.params;
    //console.log('job id id ', jobId);

    const jobDetails = await this._getJobDetailsUseCase.execute(jobId);
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_DETAILS_FETCHED,
      jobDetails,
    });
  });

  reportJob = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    //  console.log('req.body', data);
    const user = req.user;
    if (!user)
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
    const {jobId} = req.params;
    // console.log('job id ', jobId);

    if (!jobId)
      throw new AppError(
        jobMessages.error.JOBID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    await this._reportJobUseCase.execute(jobId, data, user.userId);
    return res
      .status(statusCodes.OK)
      .json({ success: true, message: jobMessages.success.JOB_REPORTED });
  });

  saveJob = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user)
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
    const {jobId} = req.params;
    //console.log('job id ', jobId);

    if (!jobId)
      throw new AppError(
        jobMessages.error.JOBID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    const savedJobs = await this._saveJobUseCase.execute(jobId, user.userId);
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
    const {jobId} = req.params;
    // console.log('job id ', jobId);

    if (!jobId)
      throw new AppError(
        jobMessages.error.JOBID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    const savedJobs = await this._removeSavedJobUseCase.execute(
      jobId,
      user.userId
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_UNSAVED,
      savedJobs,
    });
  });

  getJobStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    console.log('user from post controller status',user);
    
    if (!user)
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
    const statusData = await this._companyPostStatusUseCase.execute(
      user.userId,
      user.role
    );
   // console.log('status data', statusData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_STATUS_FETCHED,
      statusData: statusData,
    });
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { jobId } = req.params;
    const data = req.body;
    //console.log('data[status]', data.status);

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
  //  console.log('from update status', jobId, data);
    await this._updateJobStatusUseCase.execute(jobId, user.userId, user.role, data);
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_STATUS_UPDATED(data.status),
    });
  });

  updateJob = asyncHandler(async (req: Request, res: Response) => {
    // console.log('from update job');
    const user = req.user;
    const { jobId } = req.params;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    if (!jobId)
      throw new AppError(
        jobMessages.error.JOBID_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    const payload = req.body;
    //console.log('from update job', jobId, payload);
    const updated = await this._updateJobUseCase.execute(
      jobId,

      user.role,
      user.userId,
      payload as JobUpdateDto
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: jobMessages.success.JOB_UPDATED,
      job: updated,
    });
  });
}

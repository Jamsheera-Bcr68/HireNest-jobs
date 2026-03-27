import { Request, Response, NextFunction } from 'express';
import { JobReqDto } from '../validators/company/jobValidation';
import { JobCardDto, JobDto } from '../../../applications/Dtos/jobDto';
import { JobMapper } from '../mappers/jobMapper';
import { AppError } from '../../../domain/errors/AppError';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { ICrateJobUseCase } from '../../../applications/useCases/job/createJobUseCase';
import { IGetJobDetailsUseCase } from '../../../applications/useCases/candidate/GetJobDetailsUseCase';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { UserRole } from '../../../domain/enums/userEnums';
import { IGetAllJobsUseCase } from '../../../applications/useCases/candidate/GetAllJobsUseCase';

export class JobController {
  constructor(
    private createJobUseCase: ICrateJobUseCase,
    private getAllJobsUseCase: IGetAllJobsUseCase,
    private getJobDetailsUseCase: IGetJobDetailsUseCase
  ) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from jobcontroller');
    const payload: JobReqDto = req.body;

    const user = req.user;
    console.log('user from job controller', user);

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
    console.log(
      'search,page,limit,rest,sortby',
      search,
      page,
      limit,
      rest,
      sortBy
    );

    console.log('rest from controller', rest);

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

  getJobDetails = async (req: Request, res: Response, next: NextFunction) => {
    const jobId = req.params.id;
    console.log('job id id ', jobId);
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
}

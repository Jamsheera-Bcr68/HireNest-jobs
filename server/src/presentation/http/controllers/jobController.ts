import { Request, Response, NextFunction } from 'express';
import { JobReqDto } from '../validators/company/jobValidation';
import { jobDto } from '../../../applications/Dtos/jobDto';
import { JobMapper } from '../mappers/jobMapper';
import { AppError } from '../../../domain/errors/AppError';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { ICrateJobUseCase } from '../../../applications/useCases/job/createJobUseCase';
import { success } from 'zod';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
export class JobController {
  constructor(private createJobUseCase: ICrateJobUseCase) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from jobcontroller');
    const payload: JobReqDto = req.body;

    const user = req.user;
    try {
      if (!user || !user.userId) {
        throw new AppError(
          userMessages.error.NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }
      const jobData = JobMapper.toJobDto(payload, user?.userId);
      const job = await this.createJobUseCase.execute(jobData, user.userId);
      return res
        .status(statusCodes.OK)
        .json({ success: true, message: jobMessages.success.JOB_CREATED, job });
    } catch (error) {
      next(error);
    }
  };
}

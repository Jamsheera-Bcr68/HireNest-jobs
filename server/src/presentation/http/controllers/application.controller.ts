import { asyncHandler } from '../middleweres/async-handler';
import { Request, Response } from 'express';
import { IApplyJobUseCase } from '../../../applications/useCases/candidate/apply-job.usecase';
import { AppError } from '../../../domain/errors/AppError';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { applicationMessage } from '../../../shared/constants/messages/application.messages';

export class ApplicationController {
  constructor(private applyJobUseCase: IApplyJobUseCase) {}
  applyJob = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user || !user.userId) {
      throw new AppError(jobMessages.error.JOB_NOT_FOUND, statusCodes.NOTFOUND);
    }
    const { jobId } = req.params;
    console.log('from application controller', jobId);
    const applicationId = await this.applyJobUseCase.execute(
      jobId,
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: applicationMessage.success.JOB_APPLIED,
      jobId,
    });
  });
}

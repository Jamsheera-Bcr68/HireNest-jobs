import { asyncHandler } from '../../middleweres/async-handler';
import { Request, Response } from 'express';
import { IGetPendingStatusUsecase } from '../../../../applications/useCases/admin/pendings/get-pending-status.usecase';
import { AppError } from '../../../../domain/errors/app-error';
import { authMessages } from '../../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { IGetPendingUsecase } from '../../../../applications/useCases/admin/pendings/get-pendings.usecase';

export class ActivityController {
  constructor(
    private _pendingStatusData: IGetPendingStatusUsecase,
    private _getPendingsUsecase: IGetPendingUsecase
  ) {}

  getPendingStatusData = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user)
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);

    const statusData = await this._pendingStatusData.execute(
      user.userId,
      user.role
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.STATUS_FETCHED,
      statusData,
    });
  });

  getAllPendings = asyncHandler(async (req: Request, res: Response) => {
    console.log('from pending actiivity controoler');
    const user = req.user;
    if (!user)
      throw new AppError(authMessages.error.UNAUTHORIZED, statusCodes.NOTFOUND);
   const item = (req.query.item as 'jobs' | 'companies' | '') || '';
    console.log('item', item);
    console.log(req);

    const { activities, totalDocs } = await this._getPendingsUsecase.execute(
      user.userId,
      user.role,item,
      10
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITIES_FETCHED,
      pendings: activities,
      totalDocs,
    });
  });
}

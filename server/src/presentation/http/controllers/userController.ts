import { Request, Response } from 'express';
import { IGetHomeDataUseCase } from '../../../applications/useCases/candidate/GetHomeDataUseCase';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { asyncHandler } from '../middleweres/async-handler';

export class UserController {
  constructor(private getHomeDataUseCase: IGetHomeDataUseCase) {}

  getHomeData = asyncHandler(async (req: Request, res: Response) => {
    //console.log('from get home data');

    const data = await this.getHomeDataUseCase.execute();
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.HOME_DATA_FETCHED,
      data,
    });
  });
}

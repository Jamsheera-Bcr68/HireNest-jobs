import { Request, Response, NextFunction } from 'express';
import { IGetHomeDataUseCase } from '../../../applications/useCases/candidate/GetHomeDataUseCase';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { userMessages } from '../../../shared/constants/messages/userMessages';

export class UserController {
  constructor(private getHomeDataUseCase: IGetHomeDataUseCase) {}

  getHomeData = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from get home data');
    try {
      const data = await this.getHomeDataUseCase.execute();
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.HOME_DATA_FETCHED,
        data,
      });
    } catch (error: any) {
      next(error);
    }
  };
}

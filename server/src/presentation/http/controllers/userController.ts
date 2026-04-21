import { Request, Response } from 'express';
import { IGetHomeDataUseCase } from '../../../applications/useCases/candidate/GetHomeDataUseCase';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { asyncHandler } from '../middleweres/async-handler';
import { AppError } from '../../../domain/errors/AppError';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { IGetCompanyDataUseCase } from '../../../applications/useCases/company/get-company-data.usecase';

export class UserController {
  constructor(private getHomeDataUseCase: IGetHomeDataUseCase,private _getCompanyDataUseCase:IGetCompanyDataUseCase) {}

  getHomeData = asyncHandler(async (req: Request, res: Response) => {
    //console.log('from get home data');

    const data = await this.getHomeDataUseCase.execute();
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.HOME_DATA_FETCHED,
      data,
    });
  });

  getCompany=asyncHandler(async (req: Request, res: Response) => {
    const {id}=req.params
    console.log('from usercontroller,compnay id is',id);
    
    if(!id)throw new AppError(generalMessages.errors.ID_NOT_FOUND("Company"),statusCodes.BADREQUEST)

    const companyData = await this._getCompanyDataUseCase.execute(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.HOME_DATA_FETCHED,
      companyData,
    });
  });
}

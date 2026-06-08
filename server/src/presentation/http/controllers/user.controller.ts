import { Request, Response } from 'express';
import { IGetHomeDataUseCase } from '../../../applications/useCases/candidate/get-homedata.usecase';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { asyncHandler } from '../middleweres/async-handler';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { IGetCompanyDataUseCase } from '../../../applications/useCases/company/get-company-data.usecase';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { IReApplyCompanyUsecase } from '../../../applications/useCases/company/reapply-company.usecase';
import { CompanyMapper } from '../mappers/company.mapper';

export class UserController {
  constructor(
    private _getHomeDataUseCase: IGetHomeDataUseCase,
    private _getCompanyDataUseCase: IGetCompanyDataUseCase,
    private _reapplyCompanyUsecase: IReApplyCompanyUsecase
  ) {}

  getHomeData = asyncHandler(async (req: Request, res: Response) => {
    //console.log('from get home data');

    const data = await this._getHomeDataUseCase.execute();
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.HOME_DATA_FETCHED,
      data,
    });
  });

  getCompany = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('from usercontroller,compnay id is', id);

    if (!id)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Company'),
        statusCodes.BADREQUEST
      );

    const companyData = await this._getCompanyDataUseCase.execute(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.HOME_DATA_FETCHED,
      companyData,
    });
  });

  updateCompany = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const payload = req.body;

    const companyData = await this._reapplyCompanyUsecase.execute(
      CompanyMapper.toCompanyDto(payload,user.userId,),
      
      user.userId
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.COMPANY_REAPPLICATION_SUBMITTED,
      companyData,
    });
  });
}

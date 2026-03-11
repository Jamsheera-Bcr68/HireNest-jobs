import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../../../../domain/enums/userEnums';
import { adminMessages } from '../../../../shared/constants/messages/adminMessages';
import { AppError } from '../../../../domain/errors/AppError';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { IGetCompaniesUseCase } from '../../../../applications/useCases/company/GetCompaniesUseCase';

export class AdminCompanyController {
  constructor(private getCompaniesUseCase: IGetCompaniesUseCase) {}
  getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log('from admin all companies', user);
    const filter = req.params;

    try{
      if (!user || user.role !== UserRole.ADMIN) {
        throw new AppError(
          adminMessages.error.ADMIN_NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }
      const companies = await this.getCompaniesUseCase.execute(filter);
      console.log('companies', companies);

      return res.status(statusCodes.OK).json({
        success: true,
        message: adminMessages.success.COMPANIES_FETCHED,
        companies,
      });
    }catch(error:any){
      next(error)
    }
  };
}

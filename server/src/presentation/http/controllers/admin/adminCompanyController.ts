import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../../../../domain/enums/userEnums';
import { adminMessages } from '../../../../shared/constants/messages/adminMessages';
import { AppError } from '../../../../domain/errors/AppError';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { IGetCompaniesUseCase } from '../../../../applications/useCases/admin/GetCompaniesUseCase';
import { IAdminGetCompanyUseCase } from '../../../../applications/useCases/admin/GetCompanyUseCase';
import { IGetCompanyStatusUseCase } from '../../../../applications/useCases/admin/GetCompanyStatusUseCase';
import { IAdminUpdateCompanyUseCase } from '../../../../applications/useCases/admin/AdminUpdateCompanyUseCase';
import { success } from 'zod';

export class AdminCompanyController {
  constructor(
    private getCompaniesUseCase: IGetCompaniesUseCase,
    private getCompanyUseCase: IAdminGetCompanyUseCase,
    private adminUpdateCompanyUseCase: IAdminUpdateCompanyUseCase,
    private getCompanyStatusUseCase: IGetCompanyStatusUseCase
  ) {}
  getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    //console.log('user ', user);

    let query = req.query;
    console.log('query is ', query);
    const { status, industry } = query;
    if (!status || status == 'all') delete query.status;
    if (!industry || industry == 'all') delete query.industry;
    try {
      if (!user || user.role !== UserRole.ADMIN) {
        throw new AppError(
          adminMessages.error.ADMIN_NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }
      let { page, limit, search = '', ...rest } = query;
      console.log('page,rest,limit,search', page, rest, limit, search);
      const pagenumber = Number(page);

      const paginated = await this.getCompaniesUseCase.execute(
        rest,
        pagenumber,
        String(search),
        Number(limit)
      );
      const { totalDocs, companies } = paginated;
      const totalPages = Math.ceil(totalDocs / Number(limit));

      return res.status(statusCodes.OK).json({
        success: true,
        message: adminMessages.success.COMPANIES_FETCHED,
        totalDocs,
        totalPages,
        companies,
      });
    } catch (error: any) {
      next(error);
    }
  };

  getCompany = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = req.user;
    //  console.log('user,company id', user, id);
    try {
      if (!id)
        throw new AppError(
          adminMessages.error.COMPANYID_NOTFOUND,
          statusCodes.NOTFOUND
        );
      if (!user || user.role !== UserRole.ADMIN) {
        throw new AppError(
          adminMessages.error.ADMIN_NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }
      const company = await this.getCompanyUseCase.execute(id);
      return res.status(statusCodes.OK).json({
        success: true,
        message: adminMessages.success.COMPANY_FETCHED,
        company,
      });
    } catch (error: any) {
      next(error);
    }
  };

  updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user);
    const { id } = req.params;
    // console.log('id ', id);
    const data = req.body;
    // console.log('data', data);
    // console.log('req.body', req.body);

    try {
      if (!user || user.role !== UserRole.ADMIN) {
        throw new AppError(
          adminMessages.error.ADMIN_NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }

      const updated = await this.adminUpdateCompanyUseCase.execute(id, data);
      //  console.log('updated company', updated);
      const message =
        data.status === 'active'
          ? adminMessages.success.COMPANY_APPROVED
          : data.status == 'rejected'
            ? adminMessages.success.COMPANY_REJECTED
            : data.status == 'suspended'
              ? adminMessages.success.COMPANY_SUSPENDED
              : data.status == 'active'
                ? adminMessages.success.COMPANY_ACTIVATED
                : '';

      return res
        .status(statusCodes.OK)
        .json({ success: true, message: message, company: updated });
    } catch (error: any) {
      next(error);
    }
  };

  getCompanyStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    try {
      if (!user || user.role !== UserRole.ADMIN) {
        throw new AppError(
          adminMessages.error.ADMIN_NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }

      const companyStatus = await this.getCompanyStatusUseCase.execute();
      return res
        .status(statusCodes.OK)
        .json({
          success: true,
          message: adminMessages.success.STATUS_FETCHED,
          companyStatus,
        });
    } catch (error: any) {
      next(error);
    }
  };
}

import { Request, Response } from 'express';
import { UserRole } from '../../../../domain/enums/userEnums';
import { adminMessages } from '../../../../shared/constants/messages/adminMessages';
import { AppError } from '../../../../domain/errors/AppError';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { IGetCompaniesUseCase } from '../../../../applications/useCases/admin/GetCompaniesUseCase';
import { IAdminGetCompanyUseCase } from '../../../../applications/useCases/admin/GetCompanyUseCase';
import { IGetCompanyStatusUseCase } from '../../../../applications/useCases/admin/GetCompanyStatusUseCase';
import { IAdminUpdateCompanyUseCase } from '../../../../applications/useCases/admin/AdminUpdateCompanyUseCase';
import { User } from '../../../../domain/entities/User';
import { IGetEntityStatusUseCase } from '../../../../applications/interfaces/admin/IGetEntityStatusUseCase';
import { CandidateStatus } from '../../../../applications/Dtos/candidateDto';
import { IAdminGetEntitiesUseCase } from '../../../../applications/interfaces/admin/IAdminGetEntitiesUseCase';
import { UserMapper } from '../../../../applications/mappers/userMapper';
import { CandidateFilterType } from '../../../../applications/types/candidateType';
import { IAdminUpdateCandidateUseCase } from '../../../../applications/useCases/admin/AdminUpdateCandidateUseCase';
import { IAdminGetEntityUseCase } from '../../../../applications/useCases/admin/AdminGetCandidateUseCase';
import { IGetFileExistUseCase } from '../../../../applications/useCases/admin/GetFileExistUseCase';
import { success } from 'zod';
import { generalMessages } from '../../../../shared/constants/messages/generalMessages';
import { asyncHandler } from '../../middleweres/async-handler';

export class AdminUserController {
  constructor(
    private getCompaniesUseCase: IGetCompaniesUseCase,
    private getCompanyUseCase: IAdminGetCompanyUseCase,
    private adminUpdateCompanyUseCase: IAdminUpdateCompanyUseCase,
    private getCompanyStatusUseCase: IGetCompanyStatusUseCase,
    private getCandidateStatusUseCase: IGetEntityStatusUseCase<CandidateStatus>,
    private adminGetCandidatesUseCase: IAdminGetEntitiesUseCase<User>,
    private adminUpdateCandidateUseCase: IAdminUpdateCandidateUseCase,
    private adminGetEntityUseCase: IAdminGetEntityUseCase,
    private getFileExistUseCase: IGetFileExistUseCase
  ) {}

  getAllCompanies = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    //console.log('user ', user);

    let query = req.query;
   // console.log('query is ', query);
    const { status, industry } = query;
    if (!status || status == 'all') delete query.status;
    if (!industry || industry == 'all') delete query.industry;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    let { page, limit, search = '', ...rest } = query;
   // console.log('page,rest,limit,search', page, rest, limit, search);
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
  });

  getCompany = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    //  console.log('user,company id', user, id);

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
  });

  updateCompany = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    console.log(user);
    const { id } = req.params;

    const { reason, ...data } = req.body;
    console.log('reason,data',reason,data);
    

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    //console.log('data ', data);
    const updated = await this.adminUpdateCompanyUseCase.execute(
      id,
      data,
      reason
    );

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
  });

  getCompanyStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }

    const companyStatus = await this.getCompanyStatusUseCase.execute();
    return res.status(statusCodes.OK).json({
      success: true,
      message: adminMessages.success.STATUS_FETCHED,
      companyStatus,
    });
  });

  getCandidateStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }

    const candidateStatus = await this.getCandidateStatusUseCase.execute(user.userId,user.role);
    return res.status(statusCodes.OK).json({
      success: true,
      message: adminMessages.success.STATUS_FETCHED,
      status: candidateStatus,
    });
  });

  getCandidates = asyncHandler(async (req: Request, res: Response) => {
    const filter = req.query;
    console.log('filter', filter);

    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }

    const { entities, totalDocs } =
      await this.adminGetCandidatesUseCase.execute(
        filter as CandidateFilterType
      );
    return res.status(statusCodes.OK).json({
      success: true,
      message: adminMessages.success.CANDIDATES_FETCHED,
      totalDocs,
      candidates: entities.map((entity) => UserMapper.toUserProfileDto(entity)),
    });
  });

  updateCandidates = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    //  console.log(user);
    const { id } = req.params;

    const data = req.body;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }

    const updated = await this.adminUpdateCandidateUseCase.execute(id, data);

    const message = data.isBlocked
      ? adminMessages.success.CANDIDATE_BLOCKED
      : adminMessages.success.CANDIDATE_ACTIVATED;

    return res.status(statusCodes.OK).json({
      success: true,
      message: message,
      candidate: UserMapper.toUserProfileDto(updated),
    });
  });

  getCandidate = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    console.log('user,company id', user, id);

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
    const candidate = await this.adminGetEntityUseCase.execute(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: adminMessages.success.COMPANY_FETCHED,
      candidate: UserMapper.toUserProfileDto(candidate),
    });
  });

  checkFileExist = asyncHandler(async (req: Request, res: Response) => {
    const { url } = req.query;

    console.log('url', url);
    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    const fileExist = await this.getFileExistUseCase.execute(url as string);

    if (fileExist)
      return res.status(statusCodes.OK).json({
        success: true,
        message: generalMessages.success.RESUME_EXISTANCE_IDENTIFIED,
        isExist: fileExist,
      });
    return res.status(statusCodes.OK).json({
      success: false,
      message: generalMessages.success.RESUME_DELETED,
      isExist: fileExist,
    });
  });
}

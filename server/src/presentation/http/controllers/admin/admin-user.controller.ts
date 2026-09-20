import { Request, Response } from 'express';
import { UserRole } from '../../../../domain/enums/user.enums';
import { adminMessages } from '../../../../shared/constants/messages/admin.messages';
import { AppError } from '../../../../domain/errors/app-error';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { IGetCompaniesUseCase } from '../../../../applications/useCases/admin/get-companies.usecase';
import { IAdminGetCompanyUseCase } from '../../../../applications/useCases/admin/get-company-usecase';
import { IGetCompanyStatusUseCase } from '../../../../applications/useCases/admin/get-company-status.usecase';
import { IAdminUpdateCompanyUseCase } from '../../../../applications/useCases/admin/admin-update-company.usecase';
import { User } from '../../../../domain/entities/user.entity';
import { IGetEntityStatusUseCase } from '../../../../applications/interfaces/admin/get-admin-entity-status.usecase';
import { CandidateStatus } from '../../../../applications/dtos/candidate.dto';
import { IAdminGetEntitiesUseCase } from '../../../../applications/interfaces/admin/get-admin-entities.usecase';
import { UserMapper } from '../../../../applications/mappers/user.mapper';
import { CandidateFilterType } from '../../../../applications/types/candidate.type';
import { IAdminUpdateCandidateUseCase } from '../../../../applications/useCases/admin/admin-update-candidate.usecase';
import { IAdminGetEntityUseCase } from '../../../../applications/useCases/admin/admin-get-candidate.usecase';
import { IGetFileExistUseCase } from '../../../../applications/useCases/admin/file-exist.usecase';
import { success } from 'zod';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { asyncHandler } from '../../middleweres/async-handler';

export class AdminUserController { 
  constructor(  
    private _getCompaniesUseCase: IGetCompaniesUseCase,
    private _getCompanyUseCase: IAdminGetCompanyUseCase,
    private _adminUpdateCompanyUseCase: IAdminUpdateCompanyUseCase,
    private _getCompanyStatusUseCase: IGetCompanyStatusUseCase,
    private _getCandidateStatusUseCase: IGetEntityStatusUseCase<CandidateStatus>,
    private _adminGetCandidatesUseCase: IAdminGetEntitiesUseCase<User>,
    private _adminUpdateCandidateUseCase: IAdminUpdateCandidateUseCase,
    private _adminGetEntityUseCase: IAdminGetEntityUseCase,
    private _getFileExistUseCase: IGetFileExistUseCase
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
    let { page, limit, search = '', sortBy = '', ...rest } = query;
    // console.log('page,rest,limit,search', page, rest, limit, search);
    const pagenumber = Number(page);

    const paginated = await this._getCompaniesUseCase.execute(user.userId,user.role,
      rest,
      pagenumber,
      String(search),
      Number(limit),
      sortBy as string
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
    const { companyId, sortBy } = req.params;
    const user = req.user;
    //  console.log('user,company id', user, id);

    if (!companyId)
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
    const company = await this._getCompanyUseCase.execute(companyId);
    return res.status(statusCodes.OK).json({
      success: true,
      message: adminMessages.success.COMPANY_FETCHED,
      company,
    });
  });

  updateCompany = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    //console.log(user);
    const { companyId } = req.params;

    const { reason, ...data } = req.body;
    // console.log('reason,data', reason, data);

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    //console.log('data ', data);
    const updated = await this._adminUpdateCompanyUseCase.execute(
      companyId,
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

    const companyStatus = await this._getCompanyStatusUseCase.execute();
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

    const candidateStatus = await this._getCandidateStatusUseCase.execute(
      user.userId,
      user.role
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: adminMessages.success.STATUS_FETCHED,
      status: candidateStatus,
    });
  });

  getCandidates = asyncHandler(async (req: Request, res: Response) => {
    const filter = req.query;
    //  console.log('filter', filter);

    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }

    const { entities, totalDocs } =
      await this._adminGetCandidatesUseCase.execute(
        filter as CandidateFilterType
      );
    return res.status(statusCodes.OK).json({
      success: true,
      message: adminMessages.success.CANDIDATES_FETCHED,
      totalDocs,
      candidates: entities.map((entity) =>
        UserMapper.toUserProfileDto(entity, null)
      ),
    });
  });

  updateCandidates = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    //  console.log(user);
    const { candidateId } = req.params;

    const data = req.body;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }

    const updated = await this._adminUpdateCandidateUseCase.execute(
      candidateId,
      data
    );

    const message = data.isBlocked
      ? adminMessages.success.CANDIDATE_BLOCKED
      : adminMessages.success.CANDIDATE_ACTIVATED;

    return res.status(statusCodes.OK).json({
      success: true,
      message: message,
      candidate: UserMapper.toUserProfileDto(updated, null),
    });
  });

  getCandidate = asyncHandler(async (req: Request, res: Response) => {
    const { candidateId } = req.params;
    const user = req.user;
    //  console.log('user,company id', user, candidateId);

    if (!candidateId)
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
    const candidate = await this._adminGetEntityUseCase.execute(candidateId);
    console.log('admin candidate',candidate);
    
    return res.status(statusCodes.OK).json({
      success: true,
      message: adminMessages.success.COMPANY_FETCHED,
      candidate,
    });
  });

  checkFileExist = asyncHandler(async (req: Request, res: Response) => {
    const { url } = req.query;

    // console.log('url', url);
    const user = req.user;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AppError(
        adminMessages.error.ADMIN_NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    const fileExist = await this._getFileExistUseCase.execute(url as string);

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

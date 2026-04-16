import { Request, Response } from 'express';
import { CompanyRegisterType } from '../../validators/company/registerValidation';
import { AppError } from '../../../../domain/errors/AppError';
import { userMessages } from '../../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { CompanyUpdateFiedType } from '../../validators/company/companyUpdateFieldsValidation';
import {
  companyDto,
  CompanyUpdateDto,
} from '../../../../applications/Dtos/companyDto';
import { CompanyMapper } from '../../mappers/companyMapper';
import { ICompanyRegisterUseCase } from '../../../../applications/interfaces/services/company/ICompanyRegisterUseCase';
import { UploadFileDto } from '../../../../applications/Dtos/uploadFileDto';
import { IAddLogoUseCase } from '../../../../applications/useCases/company/AddLogoUseCase';
import { IGetCompanyUseCase } from '../../../../applications/useCases/company/GetCompanyUseCase';
import { ILogoRemoveUseCase } from '../../../../applications/useCases/company/LogoRemoveUsecase';
import { asyncHandler } from '../../middleweres/async-handler';
import { IChangeLogogUseCase } from '../../../../applications/useCases/company/ChangeLogoUseCase';
import { ICompanyUpdateProfileUseCase } from '../../../../applications/useCases/company/CompanyUpdateProfileUseCase';
import { ICompanyAboutUpdateUseCase } from '../../../../applications/useCases/company/CompanyAboutUpdateUseCase';

export class CompanyProfileController {
  constructor(
    private companyRegisterUseCase: ICompanyRegisterUseCase,
    private addFileUseCase: IAddLogoUseCase,
    private addDocumentUseCasez: IAddLogoUseCase,
    private getCompanyUseCase: IGetCompanyUseCase,
    private changeLogoUseCase: IChangeLogogUseCase,
    private removeLogoUseCase: ILogoRemoveUseCase,
    private compantProfieUpdateUseCase: ICompanyUpdateProfileUseCase,
    private companyAboutUpdateUseCase: ICompanyAboutUpdateUseCase
  ) {}

  getCompany = asyncHandler(async (req: Request, res: Response) => {
    console.log('from company controller');
    const user = req.user;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    const company = await this.getCompanyUseCase.execute(user.userId);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.COMPANY_FOUND,
      company,
    });
  });

  companyRegister = asyncHandler(async (req: Request, res: Response) => {
    const payload: CompanyRegisterType = req.body;

    const user = req.user;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    const companyData: Partial<companyDto> = CompanyMapper.toCompanyDto(
      payload,
      user.userId
    );
    const company = this.companyRegisterUseCase.execute(
      companyData,
      user.userId,
      user.role
    );

    return res.status(statusCodes.CREATED).json({
      success: true,
      message: userMessages.success.COMPANY_UNDER_REVIEW,
    });
  });

  logoUpdate = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const file = req.file;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    if (!file) {
      throw new AppError(
        userMessages.error.IMAGE_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    }
    const payload: UploadFileDto = {
      buffer: file.buffer,
      size: file.size,
      mimetype: file.mimetype,
      originalName: file.originalname,
    };
    const imageUrl = await this.addFileUseCase.execute(
      user.userId,
      user.role,
      payload
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.LOGO_UPLOADED,
      imageUrl,
    });
  });

  changeLogo = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const file = req.file;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    if (!file) {
      throw new AppError(
        userMessages.error.IMAGE_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    }
    const payload: UploadFileDto = {
      buffer: file.buffer,
      size: file.size,
      mimetype: file.mimetype,
      originalName: file.originalname,
    };

    const updated = await this.changeLogoUseCase.execute(
      user.userId,
      user.role,
      payload
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.LOGO_UPLOADED,
      company: updated,
    });
  });

  addDocument = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const file = req.file;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    if (!file) {
      throw new AppError(
        userMessages.error.IMAGE_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    }
    const payload: UploadFileDto = {
      buffer: file.buffer,
      size: file.size,
      mimetype: file.mimetype,
      originalName: file.originalname,
    };
    const docUrl = await this.addDocumentUseCasez.execute(
      user.userId,
      user.role,
      payload
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.DOC_UPLOADED,
      docUrl,
    });
  });

  removeLogo = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    const updated = await this.removeLogoUseCase.execute(user.userId);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.LOGO_REMOVED,
      company: updated,
    });
  });

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    const payload: CompanyUpdateDto =
      CompanyMapper.CompanyProfileEditTypeToCompanyDto(req.body);
    const updated = await this.compantProfieUpdateUseCase.execute(
      payload,
      user.userId
    );
    console.log('new updated company', updated);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.COMPANY_UPDATED,
      company: updated,
    });
  });

  updateFields = asyncHandler(async (req: Request, res: Response) => {
    console.log('from update field controller', req.body);

    const user = req.user;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }

    const payload = CompanyMapper.CompanyUpdateFiedTypeToCompanyDto(req.body);
    console.log(
      'after converting to CompanyUpdateFiedTypeToCompanyDto',
      payload
    );

    const data = await this.companyAboutUpdateUseCase.execute(
      payload,
      user.userId
    );
    console.log('new updated company', data);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.COMPANY_UPDATED,
      company: data,
    });
  });
}

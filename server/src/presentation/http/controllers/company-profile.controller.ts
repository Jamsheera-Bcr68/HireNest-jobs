import { Request, Response } from 'express';
import { CompanyRegisterType } from '../validators/company/register-validation';
import { AppError } from '../../../domain/errors/app-error';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { CompanyUpdateFiedType } from '../validators/company/company-update-fields-validation';
import {
  companyDto,
  CompanyUpdateDto,
} from '../../../applications/dtos/company.dto';
import { CompanyMapper } from '../mappers/company.mapper';
import { ICompanyRegisterUseCase } from '../../../applications/interfaces/company/company-register.usecase';
import { UploadFileDto } from '../../../applications/dtos/upload-file.dto';
import { IAddLogoUseCase } from '../../../applications/useCases/company/add-logo.usecase';
import { IGetCompanyUseCase } from '../../../applications/useCases/company/get-company.usecase';
import { ILogoRemoveUseCase } from '../../../applications/useCases/company/remove-logo.usecase';
import { asyncHandler } from '../middleweres/async-handler';
import { IChangeLogogUseCase } from '../../../applications/useCases/company/update-logo.usecase';
import { ICompanyUpdateProfileUseCase } from '../../../applications/useCases/company/company-update-profile.usecase';
import { ICompanyAboutUpdateUseCase } from '../../../applications/useCases/company/company-update-about.usecase';

export class CompanyProfileController {
  constructor(
    private _companyRegisterUseCase: ICompanyRegisterUseCase,
    private _addFileUseCase: IAddLogoUseCase,
    private _addDocumentUseCasez: IAddLogoUseCase,
    private _getCompanyUseCase: IGetCompanyUseCase,
    private _changeLogoUseCase: IChangeLogogUseCase,
    private _removeLogoUseCase: ILogoRemoveUseCase,
    private _compantProfieUpdateUseCase: ICompanyUpdateProfileUseCase,
    private _companyAboutUpdateUseCase: ICompanyAboutUpdateUseCase
  ) {}

  getCompany = asyncHandler(async (req: Request, res: Response) => {
   console.log('from company controller');
    const user = req.user;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    const company = await this._getCompanyUseCase.execute(user.userId);
    console.log('company from controoleler',company);
    
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
    const company =await this._companyRegisterUseCase.execute(
      companyData,
      user.userId, 
      user.role
    );
   // console.log('new company',company);
    

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
    const imageUrl = await this._addFileUseCase.execute(
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

    const updated = await this._changeLogoUseCase.execute(
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
    const docUrl = await this._addDocumentUseCasez.execute(
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
    const updated = await this._removeLogoUseCase.execute(user.userId);
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
    const updated = await this._compantProfieUpdateUseCase.execute(
      payload,
      user.userId
    );
  //  console.log('new updated company', updated);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.COMPANY_UPDATED,
      company: updated,
    });
  });

  updateFields = asyncHandler(async (req: Request, res: Response) => {
   // console.log('from update field controller', req.body);

    const user = req.user;

    if (!user || !user.userId) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }

    const payload = CompanyMapper.CompanyUpdateFiedTypeToCompanyDto(req.body);
   // console.log(
     // 'after converting to CompanyUpdateFiedTypeToCompanyDto',
    //  payload
    //);

    const data = await this._companyAboutUpdateUseCase.execute(
      payload,
      user.userId
    );
   // console.log('new updated company', data);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.COMPANY_UPDATED,
      company: data,
    });
  });
}

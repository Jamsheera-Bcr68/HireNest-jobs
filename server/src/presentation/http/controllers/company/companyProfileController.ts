import { NextFunction, Request, Response } from 'express';
import { CompanyRegisterType } from '../../validators/company/registerValidation';
import { AppError } from '../../../../domain/errors/AppError';
import { userMessages } from '../../../../shared/constants/messages/userMessages';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import { companyDto } from '../../../../applications/Dtos/companyDto';
import { CompanyMapper } from '../../mappers/companyMapper';
import { ICompanyRegisterUseCase } from '../../../../applications/interfaces/services/company/ICompanyRegisterUseCase';
import { UploadFileDto } from '../../../../applications/Dtos/uploadFileDto';
import { IAddLogoUseCase } from '../../../../applications/useCases/company/AddLogoUseCase';

export class CompanyProfileController {
  constructor(
    private companyRegisterUseCase: ICompanyRegisterUseCase,
    private addFileUseCase: IAddLogoUseCase,
    private addDocumentUseCasez: IAddLogoUseCase
  ) {}
  companyRegister = async (req: Request, res: Response, next: NextFunction) => {
    const payload: CompanyRegisterType = req.body;
    const user = req.user;
    try {
      if (!user || !user.userId) {
        throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
      }
      const companyData: companyDto = CompanyMapper.toCompanyDto(
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
    } catch (error: any) {
      next(error);
    }
  };

  logoUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const file = req.file;
    try {
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
    } catch (error: any) {
      next(error);
    }
  };
  addDocument = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const file = req.file;
    try {
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
    } catch (error: any) {
      next(error);
    }
  };
}

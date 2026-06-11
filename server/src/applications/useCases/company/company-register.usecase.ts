import { Company } from '../../../domain/entities/company.entity';
import { User } from '../../../domain/entities/user.entity';
import { NotificationType } from '../../../domain/enums/notification-enums';
import { StatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IAdminRepository } from '../../../domain/repository-interfaces/admin.reporitory.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { CompanyRequestType } from '../../../domain/values/profile-types';
import { getIO } from '../../../infrastructure/socket';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { companyDto } from '../../dtos/company.dto';
import { NotificationInputDto } from '../../dtos/notification.dto';
import { ICompanyRegisterUseCase } from '../../interfaces/company/company-register.usecase';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';
import { INotificationService } from '../../services/notification.service';

export class CompanyRegisterUseCase implements ICompanyRegisterUseCase {
  constructor(
    private _companyRepository: ICompanyRepository,

    private _userRepository: IUserRepository,
    private _adminRepository: IAdminRepository,
    private _notificationService: INotificationService
  ) {}
  async execute(
    payload: Partial<companyDto>,
    userId: string,
    role: UserRole
  ): Promise<Company> {
    console.log('pay load form usecase', payload);

    const user = await this._userRepository.findById(userId);
    if (!user || !user.id) {
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
    }
    payload.userId = userId;

    const emailExist = await this._companyRepository.findOne({
      email: payload.email,
    });
    if (emailExist)
      throw new AppError(
        generalMessages.errors.COMPANY_ALREADY_EXIST('Email'),
        statusCodes.CONFLICT
      );
    const nameExist = await this._companyRepository.findOne({
      email: payload.companyName,
    });
    if (nameExist)
      throw new AppError(
        generalMessages.errors.COMPANY_ALREADY_EXIST('Name'),
        statusCodes.CONFLICT
      );
    const company = await this._companyRepository.create(payload);
    if (!company.id) {
      throw new Error(userMessages.error.COMPANY_NOT_FOUND);
    }
    const request: CompanyRequestType = {
      companyId: company.id,
      status: StatusEnum.PENDING,
      date: new Date(),
    };

    await this._userRepository.save(userId, {
      ...user,
      isRequested: true,
      companyRequests: [...user.companyRequests, request],
    });

    const admin = await this._adminRepository.findOne({ role: UserRole.ADMIN });
    if (!admin)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Admin'),
        statusCodes.NOTFOUND
      );

    const notificationData: NotificationInputDto = {
      userId: admin.id,
      type: NotificationType.COMPANY_APPROVAL_REQUEST,
      title: 'New Company Registration',
      message: `${company.companyName} has registered and is awaiting approval.`,
    };

    await this._notificationService.create(notificationData);
    getIO().to(admin.id).emit('notification', notificationData);
    return company;
  }
}

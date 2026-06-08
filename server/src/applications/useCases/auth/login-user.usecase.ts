import { IloginInput, loginOutPutDto } from '../../dtos/login.dto';
import { IUserLoginUseCase } from '../../interfaces/auth/user-login.usecase';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { AppError } from '../../../domain/errors/app-error';
import { comparePassword } from '../../../infrastructure/services/password-hasher.service';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { ITokenService } from '../../interfaces/services/token.service';
import { UserRole } from '../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
//import { IAdminRepository } from "../../../domain/repositoriesInterfaces/IAdminRepository";

export class LoginUseCase implements IUserLoginUseCase {
  private _userRepository: IUserRepository;
  private _companyRepository: ICompanyRepository;
  private _tokenService: ITokenService;
  private _applicationRepository: IApplicationRepository;
  constructor(
    userRepository: IUserRepository,
    tokenService: ITokenService,
    companyRepository: ICompanyRepository,
    applicationRepository: IApplicationRepository
  ) {
    this._userRepository = userRepository;
    this._tokenService = tokenService;
    this._companyRepository = companyRepository;
    this._applicationRepository = applicationRepository;
  }
  async execute(input: IloginInput): Promise<loginOutPutDto> {
    const user: User | null = await this._userRepository.findByEmail(
      input.email
    );
    if (!user || !user.role || !user.id)
      throw new AppError(
        authMessages.error.USER_NOT_FOUND,
        statusCodes.NOTFOUND
      );
    let companyId;
    if (user.role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(user.id);
      if (!company) {
        throw new AppError(
          userMessages.error.COMPANY_NOT_FOUND,
          statusCodes.NOTFOUND
        );
      }
      companyId = company.id;
    }

    if (!(await comparePassword(input.password, user.password)))
      throw new AppError(
        authMessages.error.BAD_REQUEST,
        statusCodes.UNAUTHERIZED
      );
    if (!user.id)
      throw new AppError(
        authMessages.error.USERID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    const accessToken = this._tokenService.generateAccessToken(
      user.id?.toString(),
      user.email,
      user.role
    );

    const refreshToken = this._tokenService.generateRefreshToken(
      user.id,
      user.email,
      user.role
    );
    let isProfileCompleted;
    if (user.role === UserRole.CANDIDATE) {
      if (user.education.length && user.skills?.length && user.resumes.length) {
        isProfileCompleted = true;
      } else isProfileCompleted = false;
    }
    let applications;
    if (user.role == UserRole.CANDIDATE) {
      applications = await this._applicationRepository.getDocsByUserId(user.id);
    }
    // console.log('applied jobs',applications);

    return {
      user,
      accessToken,
      refreshToken,
      companyId,
      isProfileCompleted: isProfileCompleted,
      appliedJobs: applications ? applications.map((a) => a.jobId) : undefined,
    };
  }
}

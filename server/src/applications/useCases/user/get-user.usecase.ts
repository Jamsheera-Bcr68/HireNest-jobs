import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IGetUserUseCase } from '../../interfaces/user/get-user-data.usecase';
import { userProfileDto } from '../../dtos/user.dto';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { UserMapper } from '../../mappers/user.mapper';
import { Company } from '../../../domain/entities/company.entity';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';
import { file } from 'zod';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export class GetUserUseCase implements IGetUserUseCase {
  private _userRepository: IUserRepository;
  private _companyRepository: ICompanyRepository;
  private _applicationRepository: IApplicationRepository;
  private _interviewRepository: IInterviewRepository;
  constructor(
    userRepository: IUserRepository,
    companyRepository: ICompanyRepository,
    applicationRepository: IApplicationRepository,
    interviewRepository: IInterviewRepository,
    private _fileStorageService: IFileStorageService,
    private _fileUrlResolverService:IFileResolverService
  ) {
    this._userRepository = userRepository;
    this._companyRepository = companyRepository;
    this._applicationRepository = applicationRepository;
    this._interviewRepository = interviewRepository;
  }

  async execute(userId: string, role: UserRole): Promise<userProfileDto> {
    const user = await this._userRepository.findById(userId);
    if (!user)
      throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);

    let company: Company | null = null;
    const interviewsCount = await this._interviewRepository.count({
      candidateId: userId,
    });
    const applicationCount = await this._applicationRepository.count({
      candidateId: userId,
    });
    if (user.isRequested) {
      company = await this._companyRepository.findByUserId(userId);
    }
  const fileUrlResolver=this._fileUrlResolverService.createResolver()
    const imageUrl = user.imageUrl
      ? await this._fileStorageService.getFileUrl(user.imageUrl, 3600)
      : undefined;
    const resumes = await Promise.all(
      user.resumes.map(async (r) => ({
        ...r,
        url: await fileUrlResolver(r.url)??'',
      }))
    );
   

    const mapped = UserMapper.toUserProfileDto(
      { ...user, imageUrl: imageUrl, resumes: resumes },
      company
    );
    console.log('mapped user,company', mapped);

    return { ...mapped, interviewsCount, applicationCount };
  }
}

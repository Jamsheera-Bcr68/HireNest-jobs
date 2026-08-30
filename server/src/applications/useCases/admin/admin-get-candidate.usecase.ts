import { User } from '../../../domain/entities/user.entity';
import { AdminCandidateDto } from '../../dtos/user.dto';
import {
  ApplicationStatusEnum,
  InterviewStatusEnum,
} from '../../../domain/enums/status.enum';
import { AppError } from '../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../domain/repository-interfaces/application.repository.interface';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { adminMessages } from '../../../shared/constants/messages/admin.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { userDto } from '../../dtos/user.dto';
import { UserMapper } from '../../mappers/user.mapper';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';

export interface IAdminGetEntityUseCase {
  execute(id: string): Promise<AdminCandidateDto>;
}

export class AdminGetEntityUseCase implements IAdminGetEntityUseCase {
  constructor(
    private userRepository: IUserRepository,
    private _applicationReposotory: IApplicationRepository,
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository
  ) {}
  async execute(id: string): Promise<AdminCandidateDto> {
    const candidate = await this.userRepository.findById(id);

    if (!candidate)
      throw new AppError(
        adminMessages.error.CANDIDATE_NOTFOUND,
        statusCodes.NOTFOUND
      );
    const company = await this._companyRepository.findByUserId(id);
    const appCount = await this._applicationReposotory.count({
      candidateId: id,
    });
    const offeredCount = await this._applicationReposotory.count({
      candidateId: id,
      status: ApplicationStatusEnum.OFFERED,
    });
    const shortListedCount = await this._applicationReposotory.count({
      candidateId: id,
      status: ApplicationStatusEnum.SHORT_LISTED,
    });
    const interviewAttended = await this._interviewRepository.count({
      candidateId: id,
      status: InterviewStatusEnum.COMPLETED,
    });
    return UserMapper.toAdminCandidateDto(
      candidate,
      company,
      appCount,
      interviewAttended,
      shortListedCount,
      offeredCount
    );
  }
}

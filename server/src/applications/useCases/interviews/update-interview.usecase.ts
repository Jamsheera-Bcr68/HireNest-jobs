import { Interview } from '../../../domain/entities/interview.entity';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { IInterviewRepository } from '../../../domain/repositoriesInterfaces/interview.repository.interface';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { interviewDto } from '../../Dtos/interview.dto';
import { IUpdateEntityUseCase } from '../../interfaces/usecases/update-entity.usecase.interface';
import { InterviewMapper } from '../../mappers/interview.mapper';
import { interviewInputDto } from '../../Dtos/interview.dto';

export class UpdateInterviewUsecase implements IUpdateEntityUseCase<
  interviewInputDto,
  interviewDto
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository,
    private _userRepository: IUserRepository
  ) {}

  async execute(
    id: string,
    role: UserRole,
    userId: string,
    data: Partial<interviewInputDto>
  ): Promise<interviewDto> {
    if (role !== UserRole.COMPANY) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }
    console.log('from usecaser,filter', id, data);

    const interview = await this._interviewRepository.findById(id);
    if (!interview)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );

    const company = await this._companyRepository.findByUserId(userId);
    if (!company)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    const { date, time, ...rest } = data;

    const scheduledAt = new Date(`${date}T${time}`);

    const updated = await this._interviewRepository.update(id, {
      ...rest,
      scheduledAt,
    });

    if (!updated)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Interview'),
        statusCodes.NOTFOUND
      );
    const job = await this._jobRepository.findById(interview.jobId);
    if (!job)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Job'),
        statusCodes.NOTFOUND
      );
    const candidate = await this._userRepository.findById(
      interview.candidateId
    );
    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );
    return InterviewMapper.entityToInterviewDto(updated, job, candidate);
  }
}

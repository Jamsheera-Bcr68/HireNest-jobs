import { Interview } from '../../../domain/entities/interview.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { InterviewFilterDto, InterviewListDto } from '../../dtos/interview.dto';
import { IGetAllEntitiesUsecase } from '../../interfaces/usecases/get-all-entities.usecase.interface';
import { AppError } from '../../../domain/errors/app-error';
import { InterviewMapper } from '../../mappers/interview.mapper';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';

export class GetInterviewsUsecase implements IGetAllEntitiesUsecase<
  InterviewListDto,
  InterviewFilterDto
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _userRepository: IUserRepository
  ) {}

  async execute(
    filter: Partial<InterviewFilterDto>,
    role: UserRole,
    userId: string
  ): Promise<InterviewListDto> {
    console.log('filter from usecase', filter);

    if (role === UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);

      if (!company)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company '),
          statusCodes.NOTFOUND
        );
      filter.companyId = company.id;
    } else if (role === UserRole.CANDIDATE) {
      const candidate = await this._userRepository.findById(userId);
      if (!candidate)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Candidate '),
          statusCodes.NOTFOUND
        );
      filter.candidateId = userId;
    }

    const { interviews, totalDocs } =
      await this._interviewRepository.getAllInterviews(filter);
    return {
      interviews: interviews.map((i) => InterviewMapper.toInterviewDto(i)),
      totalDocs,
    };
  }
}

import { Interview } from '../../../domain/entities/interview.entity';
import { UserRole } from '../../../domain/enums/userEnums';
import { IInterviewRepository } from '../../../domain/repositoriesInterfaces/interview.repository.interface';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { InterviewFilterDto, InterviewListDto } from '../../Dtos/interview.dto';
import { IGetAllEntitiesUsecase } from '../../interfaces/usecases/get-all-entities.usecase.interface';
import { AppError } from '../../../domain/errors/AppError';
import { InterviewMapper } from '../../mappers/interview.mapper';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';

export class GetInterviewsUsecase implements IGetAllEntitiesUsecase<
  InterviewListDto,
  InterviewFilterDto
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository
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
    }

    const { interviews, totalDocs } =
      await this._interviewRepository.getAllInterviews(filter);
    return {
      interviews: interviews.map((i) => InterviewMapper.toInterviewDto(i)),
      totalDocs,
    };
  }
}

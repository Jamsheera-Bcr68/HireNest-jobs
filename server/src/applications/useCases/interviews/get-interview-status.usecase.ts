import { InterviewStatsCardType } from '../../Dtos/interview.dto';
import { IGetEntityStatusUseCase } from '../../interfaces/admin/IGetEntityStatusUseCase';
import { Interview } from '../../../domain/entities/interview.entity';
import { IInterviewRepository } from '../../../domain/repositoriesInterfaces/interview.repository.interface';
import { InterviewStatusEnum } from '../../../domain/enums/statusEnum';
import { UserRole } from '../../../domain/enums/userEnums';
import { ICompanyRepository } from '../../../domain/repositoriesInterfaces/company/IComapnyRepository';
import { AppError } from '../../../domain/errors/AppError';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';

export class GetInterviewStatusUseCase implements IGetEntityStatusUseCase<InterviewStatsCardType> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(userId: string, role: string): Promise<InterviewStatsCardType> {
    const filter = {} as Partial<Interview>;
    if (role == UserRole.CANDIDATE) {
      filter.candidateId = userId;
    }
    if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
      filter.companyId = company.id;
    }
    const total = await this._interviewRepository.count(filter);

    const completed = await this._interviewRepository.count({
      ...filter,
      status: InterviewStatusEnum.COMPLETED,
    });
    const upcoming = await this._interviewRepository.count({
      ...filter,
      status: InterviewStatusEnum.SCHEDULED,
    });
    const action_needed = await this._interviewRepository.count({
      ...filter,
      status: InterviewStatusEnum.SCHEDULED,

      isRescheduleRequested: true,
    });

    return {
      total: total,
      completed: completed,
      action_required: action_needed,
      upcoming: upcoming,
    };
  }
}

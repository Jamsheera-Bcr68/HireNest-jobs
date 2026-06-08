import { InterviewStatsCardType } from '../../dtos/interview.dto';
import { IGetEntityStatusUseCase } from '../../interfaces/admin/get-admin-entity-status.usecase';
import { Interview } from '../../../domain/entities/interview.entity';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { InterviewStatusEnum } from '../../../domain/enums/status.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { InterviewResult } from '../../../domain/enums/interview.enum';

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
    const passed = await this._interviewRepository.count({
      ...filter,
      result: InterviewResult.PASSED,
    });

    return {
      total: total,
      completed: completed,
      action_required: action_needed,
      upcoming: upcoming,
      passed: passed,
    };
  }
}

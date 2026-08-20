import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { InterviewFilterDto } from '../../dtos/interview.dto';
import { ICompanyService } from '../../interfaces/services/company.service';
import { DashboardUpcomingInterview } from '../../types/candidate-dashboard.types';
import { getDayAndDate, getTime } from '../../../shared/utils';

export interface IUpcomingInteriewUsecase {
  execute(userId: string, role: UserRole): Promise<DashboardUpcomingInterview|null>;
}

export class UpcomingInterviewUsecase implements IUpcomingInteriewUsecase {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(
    userId: string,
    role: UserRole
  ): Promise<DashboardUpcomingInterview | null> {
    const filter: InterviewFilterDto = {};
    if (role == UserRole.CANDIDATE) {
      filter.candidateId = userId;
    } else if (role === UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
      filter.companyId = company.id;
    } else
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
      filter.dateRange={startDate:new Date().toDateString()}

    const interview = await this._interviewRepository.getInterview({
      ...filter,
      type: 'upcoming',
      limit: 1,
    });
    if (!interview) return null;
    const time=getTime(interview.scheduledAt)
    return {
      id:interview.id,
      company: interview.company,
      role: interview.jobTitle,
      mode: interview.mode,
      date: getDayAndDate(interview.scheduledAt),
      time:time ,
      link:interview.link
    };
  }
}

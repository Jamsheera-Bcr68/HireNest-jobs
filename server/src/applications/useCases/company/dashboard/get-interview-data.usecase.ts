import { InterviewStatusEnum } from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IInterviewRepository } from '../../../../domain/repository-interfaces/interview.repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { getDateAndTime, getTime } from '../../../../shared/utils';
import { IDashboardDataListUsecase } from '../../../interfaces/dashboard/dashboard-data-list.usecase.interface';
import { IFileStorageService } from '../../../interfaces/services/file-storage.service';
import { IFileResolverService } from '../../../services/file-url-resolver.service';
import { DashboardInterview } from '../../../types/company-dashboard.types';

export class CompanyDashboardInterviewDataUsecase implements IDashboardDataListUsecase<DashboardInterview> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _fileResolverService: IFileResolverService
  ) {}

  async execute(userId: string, role: UserRole): Promise<DashboardInterview[]> {
    if (role !== UserRole.COMPANY)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );

    const company = await this._companyRepository.findByUserId(userId);
    if (!company)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );

    const { interviews } = await this._interviewRepository.getAllInterviews({
      companyId: company.id,
      sortBy: 'upcoming',
      limit: 5,
      status: InterviewStatusEnum.SCHEDULED,
    });
    console.log('interviews', interviews);

    const imageResolver = this._fileResolverService.createResolver();
    const updated = await Promise.all(
      interviews.map(async (int) => {
        const { date } = getDateAndTime(new Date(int.scheduledAt));
        const time = getTime(new Date(int.scheduledAt));
        const imageUrl = await imageResolver(int.candidateImageUrl);
        return {
          id: int.id,
          name: int.name,
          role: int.jobTitle,
          time,
          date,
          type: int.mode,
          imageUrl,
        };
      })
    );
    return updated;
  }
}

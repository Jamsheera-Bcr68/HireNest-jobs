import { UserRole } from '../../../../domain/enums/user.enums';
import { IApplicationRepository } from '../../../../domain/repository-interfaces/application.repository.interface';
import { AppData } from '../../../types/candidate-dashboard.types';

export interface IDashboardAppDataUsecase {
  execute(userId: string, role: UserRole): Promise<AppData>;
}
export class CandidateDashboardAppDataUsecase implements IDashboardAppDataUsecase {
  constructor(private _applicationRepository: IApplicationRepository) {}

  async execute(userId: string, role: UserRole): Promise<AppData> {
    const appStatusWiseData =
      await this._applicationRepository.getCountByStatus(userId);
    const { applications } =
      await this._applicationRepository.getAllApplications({
        candidateId: userId,
        limit: 4,
        sortBy: 'newest',
      });

    return {
      appStatusData: appStatusWiseData,
      recentApps: applications.map((app) => ({
        id: app.id,
        title: app.jobTitle,
        companyName: app.company,
        appliedAt: app.appliedAt,
        logoUrl: app.logo,
        status:app.status
      })),
    };
  }
}

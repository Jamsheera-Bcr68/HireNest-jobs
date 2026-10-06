import { UserRole } from '../../../../domain/enums/user.enums';
import { IApplicationRepository } from '../../../../domain/repository-interfaces/application.repository.interface';
import { IFileResolverService } from '../../../services/file-url-resolver.service';
import { AppData } from '../../../types/candidate-dashboard.types';

export interface IDashboardAppDataUsecase {
  execute(userId: string, role: UserRole): Promise<AppData>;
}
export class CandidateDashboardAppDataUsecase implements IDashboardAppDataUsecase {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _fileUrlResolverService: IFileResolverService
  ) {}

  async execute(userId: string, role: UserRole): Promise<AppData> {
    const appStatusWiseData =
      await this._applicationRepository.getCountByStatus({
        candidateId: userId,
      });
    const { applications } =
      await this._applicationRepository.getAllApplications({
        candidateId: userId,
        limit: 4,
        sortBy: 'newest',
      });

    const fileUrlResolver = this._fileUrlResolverService.createResolver();
    return {
      appStatusData: appStatusWiseData,
      recentApps: await Promise.all(
        applications.map(async (app) => ({
          id: app.id,
          title: app.jobTitle,
          companyName: app.company,
          appliedAt: app.appliedAt,
          logoUrl: await fileUrlResolver(app.logo),
          status: app.status,
        }))
      ),
    };
  }
}

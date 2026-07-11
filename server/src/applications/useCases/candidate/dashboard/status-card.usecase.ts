import { User } from '../../../../domain/entities/user.entity';
import {
  ApplicationStatusEnum,
  InterviewStatusEnum,
} from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../../domain/repository-interfaces/application.repository.interface';
import { IInterviewRepository } from '../../../../domain/repository-interfaces/interview.repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { INotificationRepository } from '../../../../domain/repository-interfaces/notification.repository.interface';
import { IUserRepository } from '../../../../domain/repository-interfaces/user-repository.interface';
import { INotificationDocument } from '../../../../infrastructure/database/models/notification.model';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { IDashboardCardDataUsecase } from '../../../interfaces/dashboard/status-card-data.usecase.interface';
import { CandidateDashboardCardsDto } from '../../../types/candidate-dashboard.types';

export class CandidateDashboardStatusDataUsecase implements IDashboardCardDataUsecase<CandidateDashboardCardsDto> {
  constructor(
    private _applicationRepository: IApplicationRepository,
    private _userRepository: IUserRepository,
    private _jobRepository: IJobRepository,
    private _interviewRepository: IInterviewRepository,
    private _notificationRepository:INotificationRepository
  ) {}
  async execute(
    userId: string,
    role: UserRole
  ): Promise<CandidateDashboardCardsDto> {
    if (role !== UserRole.CANDIDATE)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    const totalApp = await this._applicationRepository.count({
      candidateId: userId,
    });
    const today = new Date();
    const prevLastDate = new Date(today.getFullYear(), today.getMonth(), 0);

    const currentMonthAppCount = await this._applicationRepository.count({
      candidateId: userId,
      startDate: prevLastDate,
      endDate: new Date(),
    });

    const appStatusData =
      await this._applicationRepository.getCountByStatus(userId);

    const appUnderReview = appStatusData.find(
      (data) => data.status == ApplicationStatusEnum.REVIEWED
    );
    const shortListed = appStatusData.find(
      (data) => data.status == ApplicationStatusEnum.SHORT_LISTED
    );
    const scheduled = await this._interviewRepository.count({
      status: InterviewStatusEnum.SCHEDULED,
      candidateId: userId,
    });
    const candidate = await this._userRepository.findById(userId);
    if (!candidate)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Candidate'),
        statusCodes.NOTFOUND
      );

    const tomorrow = today;
    tomorrow.setDate(today.getDate() + 1);

    const recentlyExpiringJobsCount = await this._jobRepository.savedJobCount(
      candidate.savedJobs,
      { lastDate: tomorrow }
    );
    const { interviews } = await this._interviewRepository.getAllInterviews({
      candidateId: userId,
      status: InterviewStatusEnum.SCHEDULED,
      limit: 1,
      sortBy: 'upcoming',
    });
    const upcoming = interviews[0];
    const { percentage, remaining } =
      this.getProfileCompletionPercentage(candidate);
      const unreadNotificationCount=await this._notificationRepository.getCount({userId:userId,isRead:false})
    return {
      totalApplications: totalApp,
      applicationsThisMonth: currentMonthAppCount,
      underReview: appUnderReview?.count ?? 0,
      shortListedApps: shortListed?.count ?? 0,
      upcomingInterviews: scheduled,
      nextInterviewDate: new Date(upcoming?.scheduledAt),
      savedJobs: candidate.savedJobs.length,
      savedJobsClosingSoon: recentlyExpiringJobsCount,
      profileCompletion: percentage,
      remainingProfileSections: remaining,
      newNotificationCount:unreadNotificationCount,
      
    };
  }
  private getProfileCompletionPercentage(candidate: User): {
    percentage: number;
    remaining: number;
  } {
    const fields = [
      !!candidate.imageUrl,
      !!candidate.name,
      !!candidate.email,
      !!candidate.phone,
      !!candidate.title,
      !!candidate.about,
      candidate.resumes.length > 0,
      (candidate.skills?.length ?? 0) > 0,
      candidate.experience.length > 0,
      candidate.education.length > 0,
      !!candidate.address?.country,
    ];
    const completed = Object.values(fields).filter(Boolean).length;
    const total = Object.keys(fields).length;

    const profileCompletion = Math.round((completed / total) * 100);
    return { percentage: profileCompletion, remaining: total - completed };
  }
}

import {
  ApplicationStatusEnum,
  StatusEnum,
} from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../../domain/repository-interfaces/application.repository.interface';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IInterviewRepository } from '../../../../domain/repository-interfaces/interview.repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { percentageCalculator } from '../../../../shared/utils';
import { IDashboardCardDataUsecase } from '../../../interfaces/dashboard/status-card-data.usecase.interface';
import { CompanyDashboardCardsDto } from '../../../types/company-dashboard.types';
import { INotificationRepository } from '../../../../domain/repository-interfaces/notification.repository.interface';
import { ISkillRepository } from '../../../../domain/repository-interfaces/skill-repository.interface';
import { SkillStatus } from '../../../../domain/enums/skill.enum';
import { Company } from '../../../../domain/entities/company.entity';

export class CompanyDashboardStatusCardDataUsecase implements IDashboardCardDataUsecase<CompanyDashboardCardsDto> {
  constructor(
    private _companyRepository: ICompanyRepository,
    private _jobRepository: IJobRepository,
    private _applicationRepository: IApplicationRepository,
    private _interviewRepository: IInterviewRepository,
    private _notificationRepository: INotificationRepository,
    private _skillRepository: ISkillRepository
  ) {}

  async execute(
    userId: string,
    role: UserRole
  ): Promise<CompanyDashboardCardsDto> {
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
    const activeJobsCount = await this._jobRepository.getCount({
      companyId: company.id,
      status: StatusEnum.ACTIVE,
    });
    const today = new Date();

    const previousMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );
    const currentMonthJobCount = await this._jobRepository.countBetweenTheDates(
      { companyId: company.id, endDate: previousMonthLastDay }
    );
    const lastMonthJobCount = await this._jobRepository.countBetweenTheDates({
      companyId: company.id,
      endDate: new Date(today.getFullYear(), today.getMonth(), 0),
    });

    const tomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      23,
      59,
      59,
      999
    );
    const expiring = await this._jobRepository.getCount({
      companyId: company.id,
      lastDate: tomorrow,
    });
    const { percentage, isPositive } = percentageCalculator(
      currentMonthJobCount,
      lastMonthJobCount
    );

    const jobs = {
      value: activeJobsCount,
      currentMonthJobCount: currentMonthJobCount,
      change: percentage,
      isPositive,
      jobExpiringSoon: expiring,
    };
    const totalApplications = await this._applicationRepository.count({
      companyId: company.id,
    });
    const newApplications = await this._applicationRepository.count({
      companyId: company.id,
      status: ApplicationStatusEnum.PENDING,
    });
    const previousMonthApps = await this._applicationRepository.count({
      companyId: company.id,
      endDate: previousMonthLastDay,
    });
    const appdata = percentageCalculator(totalApplications, previousMonthApps);
    const applications = {
      value: totalApplications,
      newApplicaions: newApplications,
      change: appdata.percentage,
      isPositive: appdata.isPositive,
    };

    const totalInterviews = await this._interviewRepository.getCount({
      companyId: company.id,
    });
    const rescheduleRequested = await this._interviewRepository.getCount({
      companyId: company.id,
      isRescheduleRequested: true,
    });

    const upcoming = await this._interviewRepository.getInterview({
      companyId: company.id,
      type: 'upcoming',
    });
    const next = upcoming
      ? new Date(upcoming.scheduledAt).toDateString()
      : null;
    const interviews = {
      value: totalInterviews,
      rescheuleRequested: rescheduleRequested,
      nextInterview: next,
    };
    const notificationCount = await this._notificationRepository.getCount({
      userId: company.id,
      isRead: false,
    });
    const notification = {
      new: notificationCount,
    };

    const skills = {
      total: await this._skillRepository.getCount({ userId: company.id }),
      approved: await this._skillRepository.getCount({
        userId: company.id,
        status: SkillStatus.APPROVED,
      }),
    };
    const profileData = this.getProfileCompletion(company);

    return {
      activeJobs: jobs,
      applications: applications,
      interviews: interviews,
      notifications: notification,
      skills: skills,
      profile: {
        completion: profileData.percentage,
        remainingSections: profileData.remaining,
      },
    };
  }

  private getProfileCompletion(company: Company): {
    percentage: number;
    remaining: number;
    missingFields: string[];
  } {
    const fields = [
      { name: 'Company Name', filled: !!company.companyName },
      { name: 'Logo', filled: !!company.logoUrl },
      { name: 'Website', filled: !!company.website },
      { name: 'Email', filled: !!company.email },
      { name: 'Phone', filled: !!company.phone },
      { name: 'Tagline', filled: !!company.tagLine },
      { name: 'About', filled: !!company.about },
      { name: 'Mission', filled: !!company.mission },
      { name: 'Vision', filled: !!company.vision },
      { name: 'Culture', filled: !!company.culture },
      { name: 'Industry', filled: !!company.industry },
      { name: 'Company Size', filled: !!company.size },
      { name: 'Started In', filled: !!company.startedIn },
      {
        name: 'Benefits',
        filled: (company.benefits?.length ?? 0) > 0,
      },
      {
        name: 'Requested Skills',
        filled: (company.requestedSkills?.length ?? 0) > 0,
      },
      {
        name: 'Address',
        filled:
          !!company.address?.country &&
          !!company.address?.state &&
          !!company.address?.place,
      },
      {
        name: 'Social Media',
        filled: Object.values(company.socialMediaLinks ?? {}).some(Boolean),
      },
    ];

    const completed = fields.filter((f) => f.filled).length;
    const total = fields.length;

    return {
      percentage: Math.round((completed / total) * 100),
      remaining: total - completed,
      missingFields: fields.filter((f) => !f.filled).map((f) => f.name),
    };
  }
}

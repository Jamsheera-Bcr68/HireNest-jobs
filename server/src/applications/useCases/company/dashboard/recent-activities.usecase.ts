import { cp } from 'fs';
import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IApplicationRepository } from '../../../../domain/repository-interfaces/application.repository.interface';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IInterviewRepository } from '../../../../domain/repository-interfaces/interview.repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { IDashboardDataListUsecase } from '../../../interfaces/dashboard/dashboard-data-list.usecase.interface';
import { RecentActivityDto } from '../../../types/company-dashboard.types';
import { JOB_SORT, JobSortType } from '../../../types/sort.types';
import { IChatroomRepository } from '../../../../domain/repository-interfaces/chatroom.repository.interface';
import { formatDate } from '../../../../shared/utils';

const messages = {
  jobMsg: (title: string) => `New Job ${title} Published`,
  appMsg: (name: string, role: string) => `${name} applied for ${role}`,
  intMsg: (name: string, role: string) =>
    `Interview schedulle for ${name}  for ${role}`,
};
export class RecentActivitiesUsecase implements IDashboardDataListUsecase<RecentActivityDto> {
  constructor(
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository,
    private _applicationRepository: IApplicationRepository,
    private _interviewRepository: IInterviewRepository
  ) {}
  async execute(userId: string, role: UserRole): Promise<RecentActivityDto[]> {
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
    const { jobs } = await this._jobRepository.getJobs(
      { companyId: company.id },
      2,
      1,
      { job: '', location: '' },
      JOB_SORT.NEW
    );

    console.log('recent jobs',jobs);
    
    const { applications } =
      await this._applicationRepository.getAllApplications({
        companyId: company.id,
        sortBy: 'newest',
        limit: 2,
      });

    const { interviews } = await this._interviewRepository.getAllInterviews({
      companyId: company.id,
    });

    const applicationActivities: RecentActivityDto[] = applications.map(
      (app) => ({
        id: app.id,
        title:'Application Recieved ',
        type: 'application_received',
        item: 'application',
        message: messages.appMsg(app.applicant.name, app.jobTitle),
        time: formatDate(app.appliedAt),
      })
    );

    const jobActivities: RecentActivityDto[] = jobs.map((job) => ({
      id: job.id,
      title:'Job Published',
      type: 'job_published' as const,
      createdAt: job.createdAt,
      message: messages.jobMsg(job.title),
      time: formatDate(job.createdAt),
      item: 'job',
    }));

    const interviewActivity: RecentActivityDto[] = interviews.map((int) => ({
      id: int.id,
      title:'Inteview Scheduled',
      type: 'interview_scheduled' as const,
      message: messages.intMsg(int.name, int.jobTitle),
      createdAt: int.createdAt,
      item: 'interview' as const,
      time: formatDate(int.createdAt),
    }));

    const recentActivities = [
      ...jobActivities,
      ...applicationActivities,
      ...interviewActivity,
    ]
      .sort(
        (a, b) =>
          new Date(b.time).getTime() - new Date(a.time).getTime()
      )
      .slice(0, 5);

    return recentActivities;
  }
}

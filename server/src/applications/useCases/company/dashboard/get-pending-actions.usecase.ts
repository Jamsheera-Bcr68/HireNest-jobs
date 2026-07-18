import {
  ApplicationStatusEnum,
  InterviewStatusEnum,
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
import { IDashboardDataListUsecase } from '../../../interfaces/dashboard/dashboard-data-list.usecase.interface';
import { PendingActivityDto } from '../../../types/company-dashboard.types';

const DESC = {
  reschedule: (count: number) => `${count} Requested for reschedule`,
  newApps: (count: number) => `${count} Applications waiting for review`,
  shortListed: (count: number) =>
    `${count} Applications waiting for schedule interview`,
  closingJobs: (count: number) => `${count} Expiring Withing one day`,
  confirmed: (count: number) => `${count} Candidate Confirmed Interview`,
};
const TITLE = {
  reschedule: 'Reschedule Requested',
  newApps: `New Applications Recieved`,
  confirmed: `Interview Time Confimed`,
  shortListed: 'Waiting for Schedule interview ',
  closingJobs: 'Jobs Expiring soon ',
};
export class PendingActionsUsecase implements IDashboardDataListUsecase<PendingActivityDto> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _applicationRepository: IApplicationRepository,
    private _jobRepository: IJobRepository
  ) {}
  async execute(userId: string, role: UserRole): Promise<PendingActivityDto[]> {
    if (role !== UserRole.COMPANY)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    const company = await this._companyRepository.findByUserId(userId);
    if (!company || !company.id)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Company'),
        statusCodes.NOTFOUND
      );
    const data: PendingActivityDto[] = [];
    const reshceulecount = await this._interviewRepository.count({
      companyId: company.id,
      isRescheduleRequested: true,
      status: InterviewStatusEnum.SCHEDULED,
      isConfirmed: true,
    });
    const confirmedCount = await this._interviewRepository.count({
      companyId: company.id,
      status: InterviewStatusEnum.SCHEDULED,
      isConfirmed: true,
    });
    const newAppsCount = await this._applicationRepository.count({
      companyId: company.id,
      status: ApplicationStatusEnum.PENDING,
    });
    const shortListedCount = await this._applicationRepository.count({
      companyId: company.id,
      status: ApplicationStatusEnum.SHORT_LISTED,
    });
    const today = new Date();

    const tomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      23,
      59,
      0
    );

    const closingJobcount = await this._jobRepository.closingcount({
      companyId: company.id,
      status: StatusEnum.ACTIVE,
      endDate: tomorrow,
    });

    if (reshceulecount) {
      data.push({
        title: TITLE.reschedule,
        desc: DESC.reschedule(reshceulecount),
        item: 'reschedule',
      });
    }
    if (newAppsCount) {
      data.push({
        title: TITLE.newApps,
        desc: DESC.newApps(newAppsCount),
        item: 'new-apps',
      });
    }
    if (confirmedCount) {
      data.push({
        title: TITLE.confirmed,
        desc: DESC.confirmed(newAppsCount),
        item: 'confirmed-interview',
      });
    }
    if (shortListedCount) {
      data.push({
        title: TITLE.shortListed,
        desc: DESC.shortListed(newAppsCount),
        item: 'shortlisted',
      });
    }
    if (closingJobcount) {
      data.push({
        title: TITLE.closingJobs,
        desc: DESC.closingJobs(newAppsCount),
        item: 'closing-jobs',
      });
    }
    return data;
  }
}

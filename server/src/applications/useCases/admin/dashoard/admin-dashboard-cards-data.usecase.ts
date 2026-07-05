import { en } from 'zod/v4/locales';
import { StatusEnum } from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { ICompanyRepository } from '../../../../domain/repository-interfaces/company-repository.interface';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { IUserRepository } from '../../../../domain/repository-interfaces/user-repository.interface';
import { percentageCalculator } from '../../../../shared/utils';
import { IDashboardCardDataUsecase } from '../../../interfaces/dashboard/status-card-data.usecase.interface';
import { AdminDashboardCardsDto } from '../../../types/admin-dashboard.types';

export class AdminDashboardCardDataUsecase implements IDashboardCardDataUsecase<AdminDashboardCardsDto> {
  constructor(
    private _jobRepository: IJobRepository,
    private _companyRepository: ICompanyRepository,
    private _userRepository: IUserRepository
  ) {}
  async execute(): Promise<AdminDashboardCardsDto> {
    const currentActiveCount = await this._jobRepository.count({
      status: StatusEnum.ACTIVE,
    });

    const today = new Date();
    const currentMonthStartDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const previousMonthLastDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
      23,
      59,
      59,
      999
    );

    const previousActiveCount: number =
      await this._jobRepository.countBetweenTheDates({
        endDate: previousMonthLastDate,
        status: StatusEnum.ACTIVE,
      });

    // console.log(today.getMonth);

    const firstDay = today;
    firstDay.setDate;
    const { percentage, isPositive } = percentageCalculator(
      currentActiveCount,
      previousActiveCount
    );
    const jobsData = {
      count: currentActiveCount,
      changePercentage: percentage,
      isPositive,
    };

    const totalVerifiedCount = await this._companyRepository.getCount({
      status: StatusEnum.ACTIVE,
    });
    const lastMonthActiveCompanies =
      await this._companyRepository.countByFilter({
        status: StatusEnum.ACTIVE,
        endDate: previousMonthLastDate,
      });

    const compantData = percentageCalculator(
      totalVerifiedCount,
      lastMonthActiveCompanies
    );
    const pendingApproval = await this._companyRepository.getCount({
      status: StatusEnum.PENDING,
    });

    const totalCandidateCount = await this._userRepository.getCount({
      role: UserRole.CANDIDATE,
    });

    const lastMonthCandidateCount = await this._userRepository.getCountByFilter(
      { role: UserRole.CANDIDATE, endDate: previousMonthLastDate }
    );
    const candidateData = percentageCalculator(
      totalCandidateCount,
      lastMonthCandidateCount
    );
    return {
      totalActiveJobs: jobsData,
      pendingApprovals: {
        count: pendingApproval,
      },
      verifiedCompanies: {
        count: totalVerifiedCount,
        changePercentage: compantData.percentage,
        isPositive: compantData.isPositive,
      },
      registeredSeekers: {
        count: totalCandidateCount,
        changePercentage: candidateData.percentage,
        isPositive: candidateData.isPositive,
      },
    };
  }
}

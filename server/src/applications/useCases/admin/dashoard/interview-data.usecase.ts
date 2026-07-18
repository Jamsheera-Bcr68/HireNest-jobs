import { UserRole } from '../../../../domain/enums/user.enums';
import { AppError } from '../../../../domain/errors/app-error';
import { IInterviewRepository } from '../../../../domain/repository-interfaces/interview.repository.interface';
import { generalMessages } from '../../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../../shared/enums/statuscodes';
import { getPercentsgeOfTotal } from '../../../../shared/utils';
import { IDashboardDataListUsecase } from '../../../interfaces/dashboard/dashboard-data-list.usecase.interface';
import { InterviewData } from '../../../types/admin-dashboard.types';

export class InterviewDataUsecase implements IDashboardDataListUsecase<InterviewData> {
  constructor(private _interviewRepository: IInterviewRepository) {}

  async execute(userId: string, role: UserRole): Promise<InterviewData[]> {
    if (role !== UserRole.ADMIN)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );

    const interviewData =
      await this._interviewRepository.getInterviewCountByStatus();
    console.log('interviewdata', interviewData);

    const total = interviewData.reduce((acc, val) => acc + val.count, 0);
    let resultData = await this._interviewRepository.getCountByResult();
  
    const updatedResultData = resultData.filter(data=>data._id!==null).map((data) => ({
      status: data._id,
      count: data.count,
      value: getPercentsgeOfTotal(total, data.count),
    }));
    const updatedInterviewData = interviewData.filter(data=>data._id!==null).map((data) => ({
      status: data._id,
      count: data.count,
      value: getPercentsgeOfTotal(total, data.count),
    }));
    return [ ...updatedInterviewData, ...updatedResultData] ;
  }
}

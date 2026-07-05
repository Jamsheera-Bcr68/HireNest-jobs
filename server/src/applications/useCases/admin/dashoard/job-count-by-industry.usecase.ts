import { StatusEnum } from '../../../../domain/enums/status.enum';
import { UserRole } from '../../../../domain/enums/user.enums';
import { IJobRepository } from '../../../../domain/repository-interfaces/job-repository.interface';
import { IndustryType } from '../../../../domain/types/company-profile.types';
import { getPercentsgeOfTotal } from '../../../../shared/utils';

export interface IIndustryWiseJobCountUsecase {
  execute(
    userId: string,
    roel: UserRole
  ): Promise<{ industry: IndustryType; count: number }[]>;
}

export class IndustryWiseJobCountUsecase implements IndustryWiseJobCountUsecase {
  constructor(private _jobRepository: IJobRepository) {}

  async execute(
    userId: string,
    roel: UserRole
  ): Promise<{ industry: IndustryType; count: number }[]> {

    const total=await this._jobRepository.count({status:StatusEnum.ACTIVE})
    const data = await this._jobRepository.postCountByIndustry();
//console.log(`returning data`,data.map((val) => ({ industry: val._id, count: val.count })));

    return data.map((val) => ({ industry: val._id, count:getPercentsgeOfTotal(total,val.count) }));
  }
}

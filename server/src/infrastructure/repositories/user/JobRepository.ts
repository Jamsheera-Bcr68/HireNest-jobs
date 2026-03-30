import { Job } from '../../../domain/entities/Job';
import { StatusEnum } from '../../../domain/enums/statusEnum';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { IJobDocument, jobModel } from '../../database/models/jobModel';
import { GenericRepository } from '../genericRepository';
import mongoose, { Types } from 'mongoose';
import {
  JobCardDto,
  JobCountByIndustryDto,
  JobFilter,
  SalaryRange,
} from '../../../applications/Dtos/jobDto';

export class JobRepository
  extends GenericRepository<Job, IJobDocument>
  implements IJobRepository
{
  constructor() {
    super(jobModel);
  }

  protected mapToEntity(doc: IJobDocument): Job {
    return {
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      title: doc.title,
      mode: doc.mode,
      jobType: doc.jobType,
      vacancyCount: doc.vacancyCount,
      experience: doc.experience,
      state: doc.state,
      status: doc.status,
      country: doc.country,
      min_salary: doc.min_salary,
      max_salary: doc.max_salary,
      lastDate: doc.lastDate,
      languages: doc.languages,
      education: doc.education,
      isReported: doc.isReported,
      reportDetails:
        doc.reportDetails.map((report) => {
          return {
            reportedBy: report.reportedBy.toString(),
            reason: report.reason,
            info: report.info ?? '',
            reportedAt: report.reportedAt,
          };
        }) || [],
      responsibilities: doc.responsibilities || [],
      skills: doc.skills.map((_id) => _id.toString()),
      description: doc.description,
      createdAt: doc.createdAt,
    };
  }

  protected mapToPersistance(entity: Partial<Job>): Partial<IJobDocument> {
    return {
      title: entity.title,
      companyId: new Types.ObjectId(entity.companyId),
      mode: entity.mode,
      jobType: entity.jobType,
      vacancyCount: entity.vacancyCount,
      experience: entity.experience,
      isReported: entity.isReported,
      reportDetails: entity.reportDetails?.map((report) => {
        return {
          reportedBy: new mongoose.Types.ObjectId(report.reportedBy),
          reason: report.reason,
          reportedAt: report.reportedAt || new Date(),
          info: report.info,
        };
      }),
      state: entity.state,
      country: entity.country,
      min_salary: entity.min_salary,
      max_salary: entity.max_salary,
      lastDate: entity.lastDate,
      languages: entity.languages,
      education: entity.education,
      responsibilities: entity.responsibilities,
      skills: entity.skills
        ? entity.skills.map((id) => new Types.ObjectId(id))
        : [],

      description: entity.description,
    };
  }

  async count(data: Partial<Job>, filter: string): Promise<number> {
    let match = {};
    const startOfDay = new Date();

    const endOfDay = new Date();

    startOfDay.setUTCHours(0, 0, 0, 0);

    endOfDay.setHours(23, 59, 59, 999);
    if (filter === 'today') {
      match = {
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      };
    }
    match = { ...match, ...data };
    const count = await this._model.countDocuments(match);
    return count;
  }

  async industryBasedJobs(): Promise<JobCountByIndustryDto[]> {
    const datas = await this._model.aggregate([
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },

      { $unwind: '$company' },

      {
        $group: {
          _id: '$company.industry',
          industry: { $first: '$company.industry' },
          count: { $sum: 1 },
        },
      },

      {
        $project: {
          _id: 0,
          industry: 1,
          count: 1,
        },
      },

      {
        $sort: { count: -1 },
      },
    ]);

    console.log('data', datas);
    return datas;
  }

  async getJobs(
    filter: JobFilter,

    limit: number,
    page: number = 1,
    search?: { job?: string; location?: string },
    sortBy?: string
  ): Promise<JobCardDto[]> {
    console.log('filte from rep', filter);
    let sortStage: any = { createdAt: -1 };
    switch (sortBy) {
      case 'salary-high-low':
        sortStage = { min_salary: -1 };
        break;

      case 'salary-low-high':
        sortStage = { min_salary: 1 };
        break;

      case 'deadline':
        sortStage = { lastDate: 1 };
        break;

      case 'vacancy-high-low':
        sortStage = { vacancyCount: -1 };
        break;

      default:
        sortStage = { createdAt: -1 };
    }

    const { industry, jobType, experience, salary, ...rest } = filter;
    const salaryLookup = Object.fromEntries(
      SalaryRange.map((range) => [range.label, range])
    );
    console.log('salartlookup', salaryLookup);

    const matchStage: any = {
      status: StatusEnum.ACTIVE,
      ...rest,
    };
    if (rest.mode && rest.mode.length) {
      matchStage.mode = { $in: rest.mode.map((m) => m.toLowerCase()) };
    }
    if (salary && salary.length) {
      const selectedRanges = salary
        .map((label) => salaryLookup[label.trim()])
        .filter(Boolean);
      console.log('selecteed range 0-10000', selectedRanges);

      const salaryConditions = selectedRanges.map((range) => {
        if (!range.max_salary) {
          return {
            max_salary: { $gte: range.min_salary },
          };
        }

        return {
          $and: [
            { min_salary: { $lte: range.max_salary } },
            { max_salary: { $gte: range.min_salary } },
          ],
        };
      });

      matchStage.$and = [...(matchStage.$and || []), { $or: salaryConditions }];
    }

    if (search?.job) {
      matchStage.title = {
        $regex: search.job,
        $options: 'i',
      };
    }
    if (jobType && jobType.length) {
      matchStage.jobType = { $in: jobType };
    }
    if (experience && experience.length) {
      matchStage.experience = { $in: experience };
    }

    const pipeLine: any[] = [
      {
        $match: matchStage,
      },

      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'companyData',
        },
      },

      {
        $unwind: '$companyData',
      },
    ];

    if (industry && industry?.length) {
      pipeLine.push({
        $match: {
          'companyData.industry': { $in: industry },
        },
      });
    }
    if (search?.location) {
      pipeLine.push({
        $match: {
          $or: [
            {
              'companyData.address.place': {
                $regex: search.location,
                $options: 'i',
              },
            },
            {
              'companyData.address.state': {
                $regex: search.location,
                $options: 'i',
              },
            },
            {
              'companyData.address.country': {
                $regex: search.location,
                $options: 'i',
              },
            },
          ],
        },
      });
    }
    pipeLine.push(
      {
        $project: {
          _id: 1,
          title: 1,
          min_salary: 1,
          max_salary: 1,
          createdAt: 1,
          lastDate: 1,
          vacancyCount: 1,
          experience: 1,
          jobType: 1,
          mode: 1,
          skills: 1,
          companyName: '$companyData.companyName',
          companyLogo: '$companyData.logoUrl',
          location: '$companyData.address',
        },
      },

      {
        $sort: sortStage,
      },

      {
        $skip: (page - 1) * limit,
      },

      {
        $limit: limit,
      }
    );

    const jobs = await this._model.aggregate(pipeLine);

    return jobs.map(({ _id, ...job }) => ({
      id: _id.toString(),
      ...job,
    }));
  }
  async getSavedJobs(
    savedJobIds: string[],
    filter: JobFilter,

    limit: number,
    page: number = 1,
    search?: { job?: string; location?: string },
    sortBy?: string
  ): Promise<JobCardDto[]> {
    console.log('filte from rep', filter);

    if (!savedJobIds.length) return [];
    const objectIds = savedJobIds.map((id: string) => new Types.ObjectId(id));

    let sortStage: any = { createdAt: -1 };
    switch (sortBy) {
      case 'salary-high-low':
        sortStage = { min_salary: -1 };
        break;

      case 'salary-low-high':
        sortStage = { min_salary: 1 };
        break;

      case 'deadline':
        sortStage = { lastDate: 1 };
        break;

      case 'vacancy-high-low':
        sortStage = { vacancyCount: -1 };
        break;

      default:
        sortStage = { createdAt: -1 };
    }

    const { industry, jobType, experience, salary, ...rest } = filter;
    const salaryLookup = Object.fromEntries(
      SalaryRange.map((range) => [range.label, range])
    );
    console.log('salartlookup', salaryLookup);

    const matchStage: any = {
      status: StatusEnum.ACTIVE,
      _id: { $in: objectIds },
      ...rest,
    };

    if (rest.mode && rest.mode.length) {
      matchStage.mode = { $in: rest.mode.map((m) => m.toLowerCase()) };
    }
    if (salary && salary.length) {
      const selectedRanges = salary
        .map((label) => salaryLookup[label.trim()])
        .filter(Boolean);
      console.log('selecteed range 0-10000', selectedRanges);

      const salaryConditions = selectedRanges.map((range) => {
        if (!range.max_salary) {
          return {
            max_salary: { $gte: range.min_salary },
          };
        }

        return {
          $and: [
            { min_salary: { $lte: range.max_salary } },
            { max_salary: { $gte: range.min_salary } },
          ],
        };
      });

      matchStage.$and = [...(matchStage.$and || []), { $or: salaryConditions }];
    }

    if (search?.job) {
      matchStage.title = {
        $regex: search.job,
        $options: 'i',
      };
    }
    if (jobType && jobType.length) {
      matchStage.jobType = { $in: jobType };
    }
    if (experience && experience.length) {
      matchStage.experience = { $in: experience };
    }

    const pipeLine: any[] = [
      {
        $match: matchStage,
      },

      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'companyData',
        },
      },

      {
        $unwind: '$companyData',
      },
    ];

    if (industry && industry?.length) {
      pipeLine.push({
        $match: {
          'companyData.industry': { $in: industry },
        },
      });
    }
    if (search?.location) {
      pipeLine.push({
        $match: {
          $or: [
            {
              'companyData.address.place': {
                $regex: search.location,
                $options: 'i',
              },
            },
            {
              'companyData.address.state': {
                $regex: search.location,
                $options: 'i',
              },
            },
            {
              'companyData.address.country': {
                $regex: search.location,
                $options: 'i',
              },
            },
          ],
        },
      });
    }
    pipeLine.push(
      {
        $project: {
          _id: 1,
          title: 1,
          min_salary: 1,
          max_salary: 1,
          createdAt: 1,
          lastDate: 1,
          vacancyCount: 1,
          experience: 1,
          jobType: 1,
          mode: 1,
          skills: 1,
          companyName: '$companyData.companyName',
          companyLogo: '$companyData.logoUrl',
          location: '$companyData.address',
        },
      },

      {
        $sort: sortStage,
      },

      {
        $skip: (page - 1) * limit,
      },

      {
        $limit: limit,
      }
    );

    const jobs = await this._model.aggregate(pipeLine);

    return jobs.map(({ _id, ...job }) => ({
      id: _id.toString(),
      ...job,
    }));
  }
  // async getSavedJobs(
  //   savedJobIds: string[],
  //   filter: JobFilter,
  //   limit: number,
  //   page: number = 1,
  //   search?: { job?: string; location?: string },
  //   sortBy?: string
  // ): Promise<JobCardDto[]> {
  //   if (!savedJobIds.length) return [];

  //   const { industry, jobType, experience, salary, ...rest } = filter;

  //   Object.assign(matchStage, rest);

  //   if (jobType?.length) {
  //     matchStage.jobType = { $in: jobType };
  //   }

  //   if (experience?.length) {
  //     matchStage.experience = { $in: experience };
  //   }
  //   const pipeline: any[] = [
  //     {
  //       $match: matchStage,
  //     },

  //     {
  //       $lookup: {
  //         from: 'companies',
  //         localField: 'companyId',
  //         foreignField: '_id',
  //         as: 'companyData',
  //       },
  //     },

  //     {
  //       $unwind: '$companyData',
  //     },
  //   ];
  //   const jobs = await this._model.aggregate(pipeline);
  //   return jobs.map(({ _id, ...job }) => ({
  //     id: _id.toString(),
  //     ...job,
  //   }));
  // }
}

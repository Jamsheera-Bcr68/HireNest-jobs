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
  JobListDto,
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
    const data: Partial<IJobDocument> = {};

    if (entity.title !== undefined) data.title = entity.title;

    if (entity.companyId !== undefined)
      data.companyId = new Types.ObjectId(entity.companyId);

    if (entity.mode !== undefined) data.mode = entity.mode;

    if (entity.jobType !== undefined) data.jobType = entity.jobType;

    if (entity.vacancyCount !== undefined)
      data.vacancyCount = entity.vacancyCount;

    if (entity.experience !== undefined) data.experience = entity.experience;

    if (entity.status !== undefined) data.status = entity.status;

    if (entity.isReported !== undefined) data.isReported = entity.isReported;

    if (entity.reportDetails !== undefined) {
      data.reportDetails = entity.reportDetails.map((report) => ({
        reportedBy: new mongoose.Types.ObjectId(report.reportedBy),
        reason: report.reason,
        reportedAt: report.reportedAt || new Date(),
        info: report.info,
      }));
    }

    if (entity.state !== undefined) data.state = entity.state;

    if (entity.country !== undefined) data.country = entity.country;

    if (entity.min_salary !== undefined) data.min_salary = entity.min_salary;

    if (entity.max_salary !== undefined) data.max_salary = entity.max_salary;

    if (entity.lastDate !== undefined) data.lastDate = entity.lastDate;

    if (entity.languages !== undefined) data.languages = entity.languages;

    if (entity.education !== undefined) data.education = entity.education;

    if (entity.responsibilities !== undefined)
      data.responsibilities = entity.responsibilities;

    if (entity.skills !== undefined) {
      data.skills = entity.skills.map((id) => new Types.ObjectId(id));
    }

    if (entity.description !== undefined) data.description = entity.description;
    if (entity.reasonForSuspend !== undefined)
      data.reasonForSuspend = entity.reasonForSuspend;
    if (entity.reasonForRemove !== undefined)
      data.reasonForRemove = entity.reasonForRemove;

    return data;
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
  ): Promise<JobListDto> {
    console.log('filter from rep', filter);
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

    let { industry, jobType, experience, salary, companyId, status, ...rest } =
      filter;
    const salaryLookup = Object.fromEntries(
      SalaryRange.map((range) => [range.label, range])
    );
    console.log('salartlookup', salaryLookup);

    const matchStage: any = {
      ...rest,
    };
    if (companyId) {
      matchStage.companyId = { $eq: new Types.ObjectId(companyId) };
    }
    if (status) {
      matchStage.status = { $eq: status };
    }
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

    pipeLine.push({
      $facet: {
        data: [
          {
            $project: {
              _id: 1,
              title: 1,
              min_salary: 1,
              max_salary: 1,
              createdAt: 1,
              lastDate: 1,
              status: 1,
              vacancyCount: 1,
              experience: 1,
              jobType: 1,
              mode: 1,
              skills: 1,
              reportDetails: 1,
              companyName: '$companyData.companyName',
              companyLogo: '$companyData.logoUrl',
              location: '$companyData.address',
            },
          },
          { $sort: sortStage },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ],
        totalCount: [{ $count: 'count' }],
      },
    });
    type AggregatedJobDocument = JobCardDto & {
      _id: Types.ObjectId;
    };

    type AggregatedJobsResult = {
      data: AggregatedJobDocument[];
      totalCount: { count: number }[];
    };
    const result = await this._model.aggregate<AggregatedJobsResult>(pipeLine);
    // console.log('result from repo', result);

    const jobs = result[0]?.data || [];
    const totalDocs = result[0]?.totalCount[0]?.count || 0;
    return {
      jobs: jobs.map(({ _id, id, ...job }) => ({
        id: _id.toString(),
        ...job,
      })),
      totalDocs,
    };
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
}

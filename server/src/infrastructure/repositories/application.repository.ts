import { GenericRepository } from './genericRepository';
import { IApplicationRepository } from '../../domain/repositoriesInterfaces/application.repository.interface';
import {
  applicationModel,
  IApplicationDocument,
} from '../database/models/application.model';
import { Application } from '../../domain/entities/application';
import mongoose from 'mongoose';
import {
  AggregatedApplication,
  ApplicationDto,
  ApplicationListDto,
  type ApplicationFilterDto,
} from '../../applications/Dtos/application.dto';
import { PipelineStage } from 'mongoose';
import { number } from 'zod';

export class ApplicationRepository
  extends GenericRepository<Application, IApplicationDocument>
  implements IApplicationRepository
{
  constructor() {
    super(applicationModel);
  }
  protected mapToPersistance(
    entity: Partial<Application>
  ): Partial<IApplicationDocument> {
    const data: Partial<IApplicationDocument> = {};
    if (entity.jobId !== undefined)
      data.jobId = new mongoose.Types.ObjectId(entity.jobId);
    if (entity.companyId !== undefined)
      data.companyId = new mongoose.Types.ObjectId(entity.companyId);
    if (entity.candidateId !== undefined)
      data.candidateId = new mongoose.Types.ObjectId(entity.candidateId);
    if (entity.status !== undefined) data.status = entity.status;
    if (entity.rejectedReason !== undefined)
      data.rejectedReason = entity.rejectedReason;
    if (entity.resumeId !== undefined)
      data.resumeId = new mongoose.Types.ObjectId(entity.resumeId);
    if (entity.reviewedAt !== undefined) data.reviewedAt = entity.reviewedAt;
    if (entity.shortlistedAt !== undefined)
      data.shortlistedAt = entity.shortlistedAt;
    if (entity.interviewSheduledAt !== undefined)
      data.interviewSheduledAt = entity.interviewSheduledAt;
    if (entity.offeredAt !== undefined) data.offeredAt = entity.offeredAt;
    if (entity.rejectedAt !== undefined) data.rejectedAt = entity.rejectedAt;

    return data;
  }

  protected mapToEntity(doc: IApplicationDocument): Application {
    return {
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      candidateId: doc.candidateId.toString(),
      jobId: doc.jobId.toString(),
      status: doc.status,
      rejectedReason: doc.rejectedReason ?? undefined,
      appliedAt: doc.appliedAt.toString(),
      resumeId: doc.resumeId.toString(),
      reviewedAt: doc.reviewedAt,
      shortlistedAt: doc.shortlistedAt,
      interviewSheduledAt: doc.interviewSheduledAt,
      offeredAt: doc.offeredAt,
    };
  }

  async findByUserIdAndJobId(
    userId: string,
    jobId: string
  ): Promise<Application | null> {
    const doc = await this._model.findOne({
      candidateId: new mongoose.Types.ObjectId(userId),
      jobId: new mongoose.Types.ObjectId(jobId),
    });
    if (!doc) return null;
    return this.mapToEntity(doc);
  }

  async getDocsByJobId(jobId: string): Promise<Application[]> {
    const docs = await this._model.find({
      jobId: new mongoose.Types.ObjectId(jobId),
    });
    if (!docs.length) return [];
    return docs.map((doc) => this.mapToEntity(doc));
  }

  async getDocsByUserId(userId: string): Promise<Application[]> {
    const docs = await this._model.find({
      candidateId: new mongoose.Types.ObjectId(userId),
    });
    if (!docs.length) return [];
    return docs.map((doc) => this.mapToEntity(doc));
  }

  async getAllApplications(
    filter: Partial<ApplicationFilterDto>
  ): Promise<{ applications: AggregatedApplication[]; totalDocs: number }> {
    console.log('filter', filter);

    const {
      candidateId,
      status,
      search,
      page = 1,
      limit = 5,
      sortBy = 'newest',
      jobType,
    } = filter;

    let matchStage: PipelineStage.Match['$match'] = {};
    let sortStage: PipelineStage.Sort['$sort'] = {};
    if (sortBy === 'oldest') {
      sortStage = { appliedAt: 1 };
    } else {
      sortStage = { appliedAt: -1 };
    }

    if (candidateId)
      matchStage.candidateId = new mongoose.Types.ObjectId(candidateId);

    if (status) {
      matchStage.status = status;
    }
    const skip = (page - 1) * limit;
    const pipeline: PipelineStage[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'job',
        },
      },
      {
        $unwind: '$job',
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'job.companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
      { $unwind: '$company' },
    ];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            {
              'job.title': {
                $regex: search,
                $options: 'i',
              },
            },
            {
              'company.name': {
                $regex: search,
                $options: 'i',
              },
            },
            {
              status: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        },
      });
    }
    if (jobType) {
      pipeline.push({
        $match: { 'job.jobType': jobType },
      });
    }
    pipeline.push({
      $facet: {
        applications: [
          {
            $project: {
              _id: 0,
              id: { $toString: '$_id' },
              state: '$job.state',
              country: '$job.country',
              type: '$job.jobType',
              jobTitle: '$job.title',
              company: '$company.companyName',
              appliedAt: '$appliedAt',
              mode: '$job.mode',
              category: '$company.industry',
              status: '$status',
              logo: '$company.logoUrl',
            },
          },
          { $sort: sortStage },
          { $skip: skip },
          { $limit: limit },
        ],

        totalDocs: [{ $count: 'count' }],
      },
    });
    const result = await this._model.aggregate(pipeline);
    const applications = result[0]?.applications ?? [];

    const totalDocs = result[0]?.totalDocs[0]?.count ?? 0;

    return {
      applications: applications.map(
        (app: ApplicationDto & { _id: mongoose.Types.ObjectId }) =>
          app as ApplicationDto
      ),
      totalDocs,
    };
  }

  async count(filter: Partial<Application>): Promise<number> {
    const { candidateId, companyId } = filter;
    // console.log('filter', filter);

    const q = {} as IApplicationDocument;
    if (candidateId) {
      q.candidateId = new mongoose.Types.ObjectId(candidateId);
    }
    if (companyId) {
      q.companyId = new mongoose.Types.ObjectId(companyId);
    }
    if (filter.status) {
      q.status = filter.status;
    }
    // console.log('q is ', q);

    const count = await this._model.countDocuments(q);

    return count;
  }
}

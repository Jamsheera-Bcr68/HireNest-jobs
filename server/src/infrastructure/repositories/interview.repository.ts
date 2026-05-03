import { GenericRepository } from './genericRepository';
import { IInterviewRepository } from '../../domain/repositoriesInterfaces/interview.repository.interface';
import { Interview } from '../../domain/entities/interview.entity';
import { AggregatedInterviewDto } from '../../applications/Dtos/interview.dto';

import {
  IInterviewDocument,
  interviewModel,
} from '../database/models/interview.model';
import mongoose, { PipelineStage } from 'mongoose';
import { duration } from 'zod/v4/classic/iso.cjs';
import {
  InterviewFilterDto,
  InterviewListDto,
} from '../../applications/Dtos/interview.dto';
import { id } from 'zod/v4/locales';

export class InterviewRepository
  extends GenericRepository<Interview, IInterviewDocument>
  implements IInterviewRepository
{
  constructor() {
    super(interviewModel);
  }

  protected mapToEntity(doc: IInterviewDocument): Interview {
    return {
      id: doc._id.toString(),
      scheduledAt: doc.scheduledAt,
      candidateId: doc.candidateId.toString(),
      companyId: doc.companyId.toString(),
      mode: doc.mode,
      jobId: doc.jobId.toString(),
      location: doc.location,
      updatedAt: doc.updatedAt,
      status: doc.status,
      feedback: doc.feedback,
      notes: doc.notes,
      applicationId: doc.applicationId.toString(),
      result: doc.result,
      meetLink: doc.meetLink,
      createdAt: doc.createdAt,
      duration: doc.duration,
      isAddlinkLater: doc.isAddlinkLater,
      isConfirmed: doc.isConfirmed,
      isRescheduleRequested: doc.isRescheduleRequested,
      reasonForCancel: doc.reasonForCancel,
    };
  }

  protected mapToPersistance(
    entity: Partial<Interview>
  ): Partial<IInterviewDocument> {
    let data = {} as Partial<IInterviewDocument>;
    if (entity.id) data._id = new mongoose.Types.ObjectId(entity.id);
    if (entity.candidateId)
      data.candidateId = new mongoose.Types.ObjectId(entity.candidateId);
    if (entity.applicationId)
      data.applicationId = new mongoose.Types.ObjectId(entity.applicationId);
    if (entity.jobId) data.jobId = new mongoose.Types.ObjectId(entity.jobId);
    if (entity.companyId)
      data.companyId = new mongoose.Types.ObjectId(entity.companyId);
    if (entity.scheduledAt) data.scheduledAt = entity.scheduledAt;
    if (entity.mode) data.mode = entity.mode;
    if (entity.location) data.location = entity.location;
    if (entity.updatedAt) data.updatedAt = entity.updatedAt;
    if (entity.status) data.status = entity.status;
    if (entity.feedback) data.feedback = entity.feedback;
    if (entity.notes) data.notes = entity.notes;
    if (entity.result) data.result = entity.result;
    if (entity.meetLink) data.meetLink = entity.meetLink;
    if (entity.createdAt) data.createdAt = entity.createdAt;
    if (entity.duration) data.duration = entity.duration;
    if (entity.isAddlinkLater) data.isAddlinkLater = entity.isAddlinkLater;
    if (entity.isConfirmed) data.isConfirmed = entity.isConfirmed;
    if (entity.isRescheduleRequested)
      data.isRescheduleRequested = entity.isRescheduleRequested;
    if (entity.reasonForCancel) data.reasonForCancel = entity.reasonForCancel;
    return data;
  }

  async count(filter: Partial<Interview>): Promise<number> {
    const { candidateId, companyId } = filter;
    // console.log('filter', filter);

    const q = {} as IInterviewDocument;
    if (candidateId) {
      q.candidateId = new mongoose.Types.ObjectId(candidateId);
    }
    if (companyId) {
      q.companyId = new mongoose.Types.ObjectId(companyId);
    }
    if (filter.status) {
      q.status = filter.status;
    }
    if (filter.jobId) {
      q.jobId = new mongoose.Types.ObjectId(filter.jobId);
    }
    // console.log('q is ', q);

    const count = await this._model.countDocuments(q);

    return count;
  }

  async getAllInterviews(
    filter: Partial<InterviewFilterDto>
  ): Promise<{ interviews: AggregatedInterviewDto[]; totalDocs: number }> {
    console.log('filter from repository', filter);

    const {
      companyId,
      candidateId,
      jobId,
      status,
      search,
      result,
      page = 1,
      limit = 5,
      sortBy = 'upcoming',
      mode,
    } = filter;
    const skip = (page - 1) * limit;

    let matchStage: PipelineStage.Match['$match'] = {};
    if (companyId)
      matchStage.companyId = new mongoose.Types.ObjectId(companyId);
    if (result) matchStage.result = result;

    if (jobId) matchStage.jobId = new mongoose.Types.ObjectId(jobId);

    if (candidateId)
      matchStage.candidateId = new mongoose.Types.ObjectId(candidateId);

    if (status) matchStage.status = status;
    if (mode) matchStage.mode = mode;
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
      { $unwind: '$job' },

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
        $lookup: {
          from: 'users',
          localField: 'candidateId',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      { $unwind: '$candidate' },
    ];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'job.title': { $regex: search, $options: 'i' } },
            { 'company.companyName': { $regex: search, $options: 'i' } },
            { 'candidate.name': { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    pipeline.push({
      $addFields: {
        jobTitleLower: { $toLower: '$job.title' },
      },
    });
    let sortStage: PipelineStage.Sort['$sort'] = {};

    if (sortBy === 'upcoming' || sortBy === '') {
      sortStage = { scheduledAt: 1, createdAt: -1 };
    } else if (sortBy === 'newest') {
      sortStage = { createdAt: -1 };
    } else if (sortBy === 'a-z') {
      sortStage = { jobTitleLower: 1 };
    }

    pipeline.push({ $sort: sortStage });
    pipeline.push({ $sort: sortStage });
    pipeline.push({
      $facet: {
        interviews: [
          {
            $project: {
              _id: 0,
              id: { $toString: '$_id' },
              name: '$candidate.name',
              mode: '$mode',
              result: '$result',
              jobTitle: '$job.title',
              company: '$company.companyName',
              createdAt: '$createdAt',
              status: '$status',
              scheduledAt: '$scheduledAt',
            },
          },

          { $skip: skip },
          { $limit: limit },
        ],

        totalDocs: [{ $count: 'count' }],
      },
    });

    const resultDatas = await this._model.aggregate(pipeline);
    const interviews = resultDatas[0]?.interviews ?? [];
    const totalDocs = resultDatas[0]?.totalDocs[0]?.count ?? 0;

    return {
      interviews,
      totalDocs,
    };
  }
}

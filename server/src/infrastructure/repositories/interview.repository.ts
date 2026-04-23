import { GenericRepository } from './genericRepository';
import { IInterviewRepository } from '../../domain/repositoriesInterfaces/interview.repository.interface';
import { Interview } from '../../domain/entities/interview.entity';
import {
  IInterviewDocument,
  interviewModel,
} from '../database/models/interview.model';
import mongoose from 'mongoose';
import { duration } from 'zod/v4/classic/iso.cjs';

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
      createdAt:doc.createdAt,
      duration:doc.duration,
      isAddlinkLater:doc.isAddlinkLater
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

    return data;
  }
}

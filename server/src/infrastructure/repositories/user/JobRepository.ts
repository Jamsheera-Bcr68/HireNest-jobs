import { Job } from '../../../domain/entities/Job';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { IJobDocument, jobModel } from '../../database/models/jobModel';
import { GenericRepository } from '../genericRepository';
import { Types } from 'mongoose';

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
      userId: doc.userId.toString(),
      title: doc.title,
      mode: doc.mode,
      jobType: doc.jobType,
      vacancyCount: doc.vacancyCount,
      experience: doc.experience,
      state: doc.state,
      country: doc.country,
      min_salary: doc.min_salary,
      max_salary: doc.max_salary,
      lastDate: doc.lastDate,
      languages: doc.languages,
      education: doc.education,
      responsibilities: doc.responsibilities || [],
      skills: doc.skills.map((_id) => _id.toString()),
      description: doc.description,
    };
  }
  protected mapToPersistance(entity: Partial<Job>): Partial<IJobDocument> {
    return {
      title: entity.title,
      userId: new Types.ObjectId(entity.userId),
      mode: entity.mode,
      jobType: entity.jobType,
      vacancyCount: entity.vacancyCount,
      experience: entity.experience,
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
}

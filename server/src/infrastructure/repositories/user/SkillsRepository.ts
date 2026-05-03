import { Skill } from '../../../domain/entities/skill';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { GenericRepository } from '../genericRepository';

import {
  ISkillDocument,
  skillModel,
} from '../../database/models/user/skillModel';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import mongoose, { Types } from 'mongoose';

export class SkillRepository
  extends GenericRepository<Skill, ISkillDocument>
  implements ISkillRepository
{
  constructor() {
    super(skillModel);
  }
  async getAllSkills(
    filter: Partial<Skill>,
    limit?: number,
    page: number = 1,
    search?: string,
    sortBy?: string
  ): Promise<Skill[]> {
    limit = limit ?? 10;
    console.log(
      'filter,limit,page,search,sortBy',
      filter,
      limit,
      page,
      search,
      sortBy
    );

    const skip = limit * (page - 1);
    const matchStage: any = {};
    if (filter.status) {
      matchStage.status = filter.status;
    }
    if (filter.createdBy) {
      matchStage.createdBy = filter.createdBy;
    }
    if (filter.userId) {
      matchStage.userId = new Types.ObjectId(filter.userId);
    }
    if (search) {
      matchStage.skillName = { $regex: search, $options: 'i' };
    }
    sortBy = sortBy ? sortBy : 'newest';
    let sortStage = {};
    if (sortBy == 'newest') {
      sortStage = { createdAt: -1 };
    } else if (sortBy == 'oldest') {
      sortStage = { createdAt: 1 };
    } else if (sortBy == 'countofpost') {
      sortStage = { postUsedCount: -1 };
    } else if (sortBy == 'countofusers') {
      sortStage = { candidateUsedCount: -1 };
    }
    const skills = await this._model
      .find(matchStage)
      .skip(skip)
      .limit(limit)
      .sort(sortStage);
    // console.log('skills are ',skills);

    if (!skills.length) return [];
    return this.mapToEntities(skills);
  }
  protected mapToEntity(doc: ISkillDocument): Skill {
    return {
      id: doc._id.toString(),
      skillName: doc.skillName,
      createdBy: doc.createdBy,
      reviewedAt: doc.reviewedAt,
      createdAt: doc.createdAt,
      status: doc.status,
      reasonForReject: doc.reasonForReject,
      reasonForRemove: doc.reasonForRemove,
      userId: doc.userId ? doc.userId.toString() : undefined,
      postUsedCount: doc.postUsedCount,
      candidateUsedCount: doc.candidateUsedCount,
    };
  }
  mapToEntities(docs: ISkillDocument[]): Skill[] {
    return docs.map((doc) => this.mapToEntity(doc));
  }
  protected mapToPersistance(entity: Partial<Skill>): Partial<ISkillDocument> {
    console.log('from map to entity skill');
    const data = {} as Partial<ISkillDocument>;
    if (entity.skillName) data.skillName = entity.skillName;
    if (entity.createdAt) data.createdAt = new Date(entity.createdAt);
    if (entity.reviewedAt) data.reviewedAt = new Date(entity.reviewedAt);
    if (entity.status) data.status = entity.status;
    if (entity.createdBy) data.createdBy = entity.createdBy;
    if (entity.userId) data.userId = new Types.ObjectId(entity.userId);
    if (entity.reasonForReject) data.reasonForReject = entity.reasonForReject;
    if (entity.reasonForRemove) data.reasonForRemove = entity.reasonForRemove;
    if (entity.postUsedCount) data.postUsedCount = entity.postUsedCount;
    if (entity.candidateUsedCount)
      data.candidateUsedCount = entity.candidateUsedCount;

    return data;
  }

  async updatePostUsedCount(
    skills: string[],
    action: 'add' | 'remove'
  ): Promise<void> {
    let count = action == 'add' ? 1 : -1;
    const skillIds = skills.map((id) => new Types.ObjectId(id));

    await this._model.updateMany(
      { _id: { $in: skillIds } },
      { $inc: { postUsedCount: count } }
    );
  }

  async updateCandidateUsedCount(
    id: string,
    action: 'add' | 'remove'
  ): Promise<void> {
    let count = action == 'add' ? 1 : -1;
    await this._model.findByIdAndUpdate(id, {
      $inc: { candidateUsedCount: count },
    });
  }
  async getSkillByUserId(userId: string): Promise<Skill[]> {
    const docs = await this._model.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    return docs.map((sk) => this.mapToEntity(sk));
  }
  async count(filter: Partial<Skill>): Promise<number> {
    const { createdBy, status, userId } = filter;
    const match = {} as Partial<ISkillDocument>;
    if (createdBy) {
      match.createdBy = createdBy;
    }
    if (status) {
      match.status = status;
    }
    if (userId) {
      match.userId = new mongoose.Types.ObjectId(userId);
    }

    const count = await this._model.countDocuments(match);
    return count;
  }

  async findBySkillName(skillName: string): Promise<Skill | null> {
    return this._model.findOne({
      skillName: { $regex: `^${skillName}$`, $options: 'i' },
    });
  }
  async findByIds(skillIds: string[]): Promise<Skill[]> {
    const objectIds = skillIds.map((id) => new mongoose.Types.ObjectId(id));

    const skills = await this._model.find({
      _id: { $in: objectIds },
    });

    return skills.map((skill) => this.mapToEntity(skill));
  }
}

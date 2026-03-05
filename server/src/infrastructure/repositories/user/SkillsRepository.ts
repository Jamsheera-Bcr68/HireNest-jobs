import { Skill } from '../../../domain/entities/skill';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { GenericRepository } from '../genericRepository';
import {
  ISkillDocument,
  skillModel,
} from '../../database/models/user/skillModel';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import { Types } from 'mongoose';

export class SkillRepository
  extends GenericRepository<Skill, ISkillDocument>
  implements ISkillRepository
{
  constructor() {
    super(skillModel);
  }
  async getAllSkills(): Promise<Array<Skill | null>> {
    const skills = await this._model.find({
      status: SkillStatus.APPROVED,
    });
    // console.log('skills are ',skills);

    if (!skills.length) return [];
    return this.mapToEntities(skills);
  }
  protected mapToEntity(doc: ISkillDocument): Skill {
    return {
      id: doc._id.toString(),
      skillName: doc.skillName,
      createdBy: doc.createdBy,
      userId: doc.userId ? doc.userId.toString() : undefined,
    };
  }
  mapToEntities(docs: ISkillDocument[]): Skill[] {
    return docs.map((doc) => this.mapToEntity(doc));
  }
  protected mapToPersistance(entity: Partial<Skill>): Partial<ISkillDocument> {
    console.log('from map to entity skill');

    return {
      skillName: entity.skillName,
      createdBy: entity.createdBy,
      userId: entity.userId ? new Types.ObjectId(entity.userId) : undefined,
      createdAt: entity.createdAt,
      status: entity.status,
    };
  }
}

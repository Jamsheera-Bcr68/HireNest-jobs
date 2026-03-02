import { Skill } from '../../../domain/entities/skill';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { GenericRepository } from '../genericRepository';
import {
  ISkillDocument,
  skillModel,
} from '../../database/models/user/skillModel';
import { SkillStatus } from '../../../domain/enums/skillEnum';

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
    };
  }
  mapToEntities(docs: ISkillDocument[]): Skill[] {
    return docs.map((doc) => this.mapToEntity(doc));
  }
  protected mapToPersistance(entity: Partial<Skill>): Partial<ISkillDocument> {
    return {
      skillName: entity.skillName,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
      status: entity.status,
    };
  }
}

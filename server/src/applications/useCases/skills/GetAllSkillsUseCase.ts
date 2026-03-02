import { Skill } from '../../../domain/entities/skill';
import { IGetAllSkillsUseCase } from '../../interfaces/user/IGetSkillsUseCase';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';

export class GetAllSkillsUseCase implements IGetAllSkillsUseCase {
  private _skillRepository: ISkillRepository;
  constructor(skillRepository: ISkillRepository) {
    this._skillRepository = skillRepository;
  }
  async execute(): Promise<Array<Skill | null>> {
    const skills = await this._skillRepository.getAllSkills();
    return skills;
  }
}

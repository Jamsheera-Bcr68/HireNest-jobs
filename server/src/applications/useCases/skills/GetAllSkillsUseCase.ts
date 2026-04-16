import { Skill } from '../../../domain/entities/skill';
import { IGetAllSkillsUseCase } from '../../interfaces/user/IGetSkillsUseCase';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { SkillListDto, UserSkillDto } from '../../Dtos/skillDto';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { UserRole } from '../../../domain/enums/userEnums';

export class GetAllSkillsUseCase implements IGetAllSkillsUseCase {
  constructor(
    private skillRepository: ISkillRepository,
    private jobReposistory: IJobRepository,
    private userRepository: IUserRepository
  ) {}
  async execute(
    userId: string,
    role: UserRole,
    filter: Partial<Skill>,
    limit?: number,
    page?: number,
    search?: string,
    sortBy?: string
  ): Promise<SkillListDto> {
    const skillDocs = await this.skillRepository.getAllSkills(
      filter,
      limit,
      page,
      search,
      sortBy
    );
    const totalDocs = await this.skillRepository.getCount(filter);
    if (!skillDocs.length) return { skills: [], totalDocs: totalDocs };

    const skills = await Promise.all(
      skillDocs.map(async (skill) => {
        const postCount =
          skill.status === 'approved'
            ? await this.jobReposistory.getCountBySkill(skill.id)
            : 0;
        const candidateCount =
          skill.status === 'approved'
            ? await this.userRepository.getCountBySkill(skill.id)
            : 0;

        return this.maptToUserSkillDto(skill, postCount, candidateCount);
      })
    );
    return { skills, totalDocs };
  }
  private maptToUserSkillDto(
    skill: Skill,
    usedCount: number = 0,
    candidateCount: number = 0
  ): UserSkillDto {
    console.log('skill map to dto', skill, usedCount);

    return { ...skill, usedCount, usedCandidateCount: candidateCount };
  }
}

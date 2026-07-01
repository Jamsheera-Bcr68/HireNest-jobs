import { Skill } from '../../../domain/entities/skill.entity';
import { IGetAllSkillsUseCase } from '../../interfaces/user/get-skills.usecase';
import { ISkillRepository } from '../../../domain/repository-interfaces/skill-repository.interface';
import { IJobRepository } from '../../../domain/repository-interfaces/job-repository.interface';
import { SkillListDto, UserSkillDto } from '../../dtos/skill.dto';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { UserRole } from '../../../domain/enums/user.enums';

export class GetAllSkillsUseCase implements IGetAllSkillsUseCase {
  constructor(
    private skillRepository: ISkillRepository,
    private jobReposistory: IJobRepository,
    private _userRepository: IUserRepository
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
            ? await this._userRepository.getCountBySkill(skill.id,UserRole.CANDIDATE)
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
  //  console.log('skill map to dto', skill, usedCount);

    return { ...skill, usedCount, usedCandidateCount: candidateCount };
  }
}

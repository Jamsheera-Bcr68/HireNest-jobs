import { Skill } from '../../../domain/entities/skill';
import { IGetAllSkillsUseCase } from '../../interfaces/user/IGetSkillsUseCase';
import { ISkillRepository } from '../../../domain/repositoriesInterfaces/ISkillRepository';
import { IJobRepository } from '../../../domain/repositoriesInterfaces/IJobRepository';
import { SkillListDto, UserSkillDto } from '../../Dtos/skillDto';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { UserRole } from '../../../domain/enums/userEnums';
import { AppError } from '../../../domain/errors/AppError';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { SkillStatus } from '../../../domain/enums/skillEnum';

export class GetRequestedSkillsUseCase implements IGetAllSkillsUseCase {
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
    if (role !== UserRole.COMPANY) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }
    const finalFilter = {
      ...filter,
      createdBy: UserRole.COMPANY,
      userId,
    };
    const skillDocs = await this.skillRepository.getAllSkills(
      finalFilter,
      limit,
      page,
      search,
      sortBy
    );

    const totalDocs = await this.skillRepository.count(finalFilter);

    if (!skillDocs.length) return { skills: [], totalDocs: totalDocs };

    const skills = await Promise.all(
      skillDocs.map(async (skill) => {
        const postCount =
          skill.status === SkillStatus.APPROVED
            ? await this.jobReposistory.getCountBySkill(skill.id)
            : 0;
        const candidateCount =
          skill.status === SkillStatus.APPROVED
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

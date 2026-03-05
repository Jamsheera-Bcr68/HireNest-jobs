import { Request, Response, NextFunction } from 'express';
import { IGetAllSkillsUseCase } from '../../../applications/interfaces/user/IGetSkillsUseCase';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { success } from 'zod';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { AppError } from '../../../domain/errors/AppError';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { IAddSkillUseCase } from '../../../applications/useCases/skills/AddSkillUseCase';

export class SkillsController {
  private _getAllSkillsUseCase: IGetAllSkillsUseCase;
  private _addSkillUseCase: IAddSkillUseCase;
  constructor(
    getAllSkillsUseCase: IGetAllSkillsUseCase,
    addSkillUseCase: IAddSkillUseCase
  ) {
    this._getAllSkillsUseCase = getAllSkillsUseCase;
    this._addSkillUseCase = addSkillUseCase;
  }

  getAllSkills = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from getAllskills controller');
    try {
      const { status } = req.query;
      console.log('query status', status);

      const skills = await this._getAllSkillsUseCase.execute();
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.SKILL_FETCHED,
        skills,
      });
    } catch (error) {
      next(error);
    }
  };
  addSkill = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from skill create controller');

    const { skill } = req.body;
    const user = req.user;
    console.log('user from auth', user);

    try {
      if (!user) {
        throw new AppError(
          userMessages.error.NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }
      if (!skill)
        throw new AppError(
          jobMessages.error.SKILL_NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      const newSkill = await this._addSkillUseCase.execute(
        skill,
        user.userId,
        user.role
      );
      console.log('created skill', newSkill);

      return res
        .status(statusCodes.CREATED)
        .json({
          success: true,
          message: jobMessages.success.SKILL_CREATED,
          skill: newSkill,
        });
    } catch (error: any) {
      next(error);
    }
  };
}

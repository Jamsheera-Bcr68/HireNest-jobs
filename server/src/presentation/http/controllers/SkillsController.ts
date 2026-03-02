import { Request, Response, NextFunction } from 'express';
import { IGetAllSkillsUseCase } from '../../../applications/interfaces/user/IGetSkillsUseCase';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { success } from 'zod';
import { userMessages } from '../../../shared/constants/messages/userMessages';

export class SkillsController {
  private _getAllSkillsUseCase: IGetAllSkillsUseCase;
  constructor(getAllSkillsUseCase: IGetAllSkillsUseCase) {
    this._getAllSkillsUseCase = getAllSkillsUseCase;
  }

  getAllSkills = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from getAllskills controller');
    try {
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
}

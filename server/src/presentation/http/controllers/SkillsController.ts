import { Request, Response } from 'express';
import { IGetAllSkillsUseCase } from '../../../applications/interfaces/user/IGetSkillsUseCase';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IGetEntitySatusUseCase } from '../../../applications/interfaces/usecases/get-entity-status.usecase.interface';
import { userMessages } from '../../../shared/constants/messages/userMessages';
import { AppError } from '../../../domain/errors/AppError';
import { jobMessages } from '../../../shared/constants/messages/jobMessages';
import { IAddSkillUseCase } from '../../../applications/useCases/skills/AddSkillUseCase';
import { asyncHandler } from '../middleweres/async-handler';
import { SkillStatusCardDto } from '../../../applications/Dtos/skillDto';
import { skillMessages } from '../../../shared/constants/messages/skill.messages';
import { UserRole } from '../../../domain/enums/userEnums';
import { IUpdateEntityStatusUseCase } from '../../../applications/interfaces/usecases/update-entity-status.usecase.interface';
import { Skill } from '../../../domain/entities/skill';
import { SkillStatus } from '../../../domain/enums/skillEnum';
import { authMessages } from '../../../shared/constants/messages/authMesages';
import { IUpdateEntityUseCase } from '../../../applications/interfaces/usecases/update-entity.usecase.interface';

export class SkillsController {
  private _getAllSkillsUseCase: IGetAllSkillsUseCase;
  private _addSkillUseCase: IAddSkillUseCase;
  private _getSkillStatusUsecase: IGetEntitySatusUseCase<SkillStatusCardDto>;
  private _updateSkillStatusUsecase: IUpdateEntityStatusUseCase<
    Skill,
    SkillStatus
  >;
  private _updateSkillUsecase: IUpdateEntityUseCase<{ skill: string }, void>;
  private _getRequestedSkillsUseCase: IGetAllSkillsUseCase;
  constructor(
    getAllSkillsUseCase: IGetAllSkillsUseCase,
    addSkillUseCase: IAddSkillUseCase,
    getSkillStatusUsecase: IGetEntitySatusUseCase<SkillStatusCardDto>,
    updateSkillStatusUsecase: IUpdateEntityStatusUseCase<Skill, SkillStatus>,
    updateSkillUsecase: IUpdateEntityUseCase<{ skill: string }, void>,
    getRequestedSkillsUseCase: IGetAllSkillsUseCase
  ) {
    this._getAllSkillsUseCase = getAllSkillsUseCase;

    this._addSkillUseCase = addSkillUseCase;
    this._getSkillStatusUsecase = getSkillStatusUsecase;
    this._updateSkillStatusUsecase = updateSkillStatusUsecase;
    this._updateSkillUsecase = updateSkillUsecase;
    this._getRequestedSkillsUseCase = getRequestedSkillsUseCase;
  }

  getAllSkills = asyncHandler(async (req: Request, res: Response) => {
    console.log('from getAllskills controller');
    const user = req.user;
    console.log('user from skill controler', user);

    if (!user) {
      throw new AppError(
        userMessages.error.NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    const data = req.query;
    console.log('query status', data);
    let filter = {};
    let { limit, page, search, sortBy } = req.query;
    if (data.status && data.status !== 'all') {
      filter = { ...filter, status: data.status };
    }
    if (data.createdBy) {
      filter = { ...filter, createdBy: data.createdBy };
    }
    search = search ? search : '';
    const { skills, totalDocs } = await this._getAllSkillsUseCase.execute(
      user.userId,
      user.role,
      filter,
      Number(limit),
      Number(page),
      search as string,
      sortBy as string
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.SKILL_FETCHED,
      data: { skills, totalDocs },
    });
  });

  getAllRequestedSkills = asyncHandler(async (req: Request, res: Response) => {
    console.log('from get requested Allskills controller');
    const user = req.user;
    console.log('requested from skill controler', user);

    if (!user) {
      throw new AppError(
        userMessages.error.NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    const data = req.query;
    console.log('query status', data);
    let filter = {};
    let { limit, page, search, sortBy } = req.query;
    if (data.status && data.status !== 'all') {
      filter = { ...filter, status: data.status };
    }
    if (data.createdBy) {
      filter = { ...filter, createdBy: data.createdBy };
    }
    search = search ? search : '';
    const { skills, totalDocs } = await this._getRequestedSkillsUseCase.execute(
      user.userId,
      user.role,
      filter,
      Number(limit),
      Number(page),
      search as string,
      sortBy as string
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.SKILL_FETCHED,
      data: { skills, totalDocs },
    });
  });

  addSkill = asyncHandler(async (req: Request, res: Response) => {
    console.log('from skill create controller');

    const { skill } = req.body;
    const user = req.user;
    console.log('user from skill controler', user);

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

    return res.status(statusCodes.CREATED).json({
      success: true,
      message:
        user.role == UserRole.ADMIN
          ? jobMessages.success.SKILL_CREATED
          : jobMessages.success.PENDING_SKILL_CREATED,
      skill: newSkill,
    });
  });

  getSkillStatus = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      throw new AppError(
        userMessages.error.NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    const skillStatus = await this._getSkillStatusUsecase.execute(
      user.userId,
      user.role
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: skillMessages.success.STATUS_FETCHED,
      statusData: skillStatus,
    });
  });

  updateSkillStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      throw new AppError(
        userMessages.error.NOT_FOUND,
        statusCodes.UNAUTHERIZED
      );
    }
    if (!id)
      throw new AppError(
        jobMessages.error.SKILLID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    const { status, reason } = req.body;
    console.log('from skill status updata,staus,reason', status, reason);
    await this._updateSkillStatusUsecase.execute(
      id,
      user.userId,
      user.role,
      status,
      reason
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: skillMessages.success.STATUS_STATUS_UPDATED(status),
    });
  });

  updateSkill = asyncHandler(async (req: Request, res: Response) => {
    console.log('from update skill');
    const user = req.user;
    const { id } = req.params;

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    if (!id)
      throw new AppError(
        skillMessages.error.SKILL_ID_NOTfOUND,
        statusCodes.NOTFOUND
      );
    const { skill } = req.body;
    console.log('from update job', id, skill);
    await this._updateSkillUsecase.execute(
      id,

      user.role,
      user.userId,
      { skill }
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: skillMessages.success.SKILL_UPDATED,
    });
  });
}

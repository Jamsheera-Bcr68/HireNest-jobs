import { Request, Response, NextFunction } from 'express';
import { IProfileEditUsecase } from '../../../../applications/interfaces/candidate/IProfileEditUsecase';
import { CandidateProfileUpdateDto } from '../../../../applications/Dtos/candidateDto';
import { AppError } from '../../../../domain/errors/AppError';
import { authMessages } from '../../../../shared/constants/messages/authMesages';
import { statusCodes } from '../../../../shared/enums/statusCodes';
import type { UpdataUserProfileInput } from '../../validators/profileValidation';
import { userMessages } from '../../../../shared/constants/messages/userMessages';
import { IGetUserUseCase } from '../../../../applications/interfaces/user/IGetUserDataUsecase';
import { UserMapper } from '../../../../applications/mappers/userMapper';
import { IEditProfileImageUsecase } from '../../../../applications/interfaces/user/IEditProfileImageUsecase';
import { UploadFileDto } from '../../../../applications/Dtos/uploadFileDto';
import { IRemoveProfileImageUseCase } from '../../../../applications/interfaces/user/IRemoveProfileImage';
import { IAddSkillToProfileUseCase } from '../../../../applications/interfaces/candidate/IAddSkilltoProfileUseCase';
import { IEditAboutUseCase } from '../../../../applications/interfaces/candidate/IEditAboutUseCase';
import { IRemoveSkillFromProfileUseCase } from '../../../../applications/interfaces/candidate/IRemoveSkillUseCase';
import { ExperienceDto } from '../../validators/profileValidation';
import { IAddExperienceUseCase } from '../../../../applications/interfaces/candidate/IAddExperienceUseCase';
import { IEditExperienceUseCase } from '../../../../applications/interfaces/candidate/IEditExperienceUseCase';
import { IRemoveExperienceUseCase } from '../../../../applications/interfaces/candidate/IRemoveExperienceUseCase';
import { EducationType } from '../../validators/educationFormValidator';
import { ProfileDataMapper } from '../../../../applications/mappers/profileDataMaper';
import { IAddEducationUseCase } from '../../../../applications/interfaces/candidate/IAddEducationUseCase';
import { IGetAllEducationUseCase } from '../../../../applications/interfaces/candidate/IGetAllEducationUseCase';
import { IEditEducationUseCase } from '../../../../applications/interfaces/candidate/IEditEducationUseCase';
import { IRemoveEducationUseCase } from '../../../../applications/interfaces/candidate/IRemoveEducationUseCase';
import { generalMessages } from '../../../../shared/constants/messages/generalMessages';
import { IAddResumeUseCase } from '../../../../applications/interfaces/candidate/IAddResumeUseCase';
import { IRemoveResumeUseCase } from '../../../../applications/interfaces/candidate/IRemoveResumeUseCase';
import { success } from 'zod';

export class CandidateProfileController {
  private _candidateEditProfileUsecase: IProfileEditUsecase;
  private _getUserUseCase: IGetUserUseCase;
  private _editProfileImageUseCase: IEditProfileImageUsecase;
  private _removeProfileImageUseCase: IRemoveProfileImageUseCase;
  private _editAboutUseCase: IEditAboutUseCase;
  private _addSkillToProfileUseCase: IAddSkillToProfileUseCase;
  private _removeSkillUseCase: IRemoveSkillFromProfileUseCase;
  private _addExperienceUseCase: IAddExperienceUseCase;
  private _editExperienceUseCase: IEditExperienceUseCase;
  private _removeExperienceUseCase: IRemoveExperienceUseCase;
  private _addEducationUseCase: IAddEducationUseCase;
  private _removeEducationUseCase: IRemoveEducationUseCase;
  private _editEducationUseCase: IEditEducationUseCase;
  private _addResumeUseCase: IAddResumeUseCase;
  constructor(
    candidateEditProfileUsecase: IProfileEditUsecase,
    getUserUseCase: IGetUserUseCase,
    editProfileImageUseCase: IEditProfileImageUsecase,
    removeProfileImageUseCase: IRemoveProfileImageUseCase,
    editAboutUseCase: IEditAboutUseCase,
    addSkillToProfileUseCase: IAddSkillToProfileUseCase,
    removeSkillUseCase: IRemoveSkillFromProfileUseCase,
    addExperienceUseCase: IAddExperienceUseCase,
    editExperienceUseCase: IEditExperienceUseCase,
    removeExperienceUseCase: IRemoveExperienceUseCase,
    addEducationUseCase: IAddEducationUseCase,
    editEducationUseCase: IEditEducationUseCase,
    removeEducationUseCase: IRemoveEducationUseCase,
    addResumeUseCase: IAddResumeUseCase,
    private removeResumeUseCase: IRemoveResumeUseCase
  ) {
    this._candidateEditProfileUsecase = candidateEditProfileUsecase;
    this._getUserUseCase = getUserUseCase;
    this._editProfileImageUseCase = editProfileImageUseCase;
    this._removeProfileImageUseCase = removeProfileImageUseCase;
    this._editAboutUseCase = editAboutUseCase;
    this._addSkillToProfileUseCase = addSkillToProfileUseCase;
    this._removeSkillUseCase = removeSkillUseCase;
    this._addExperienceUseCase = addExperienceUseCase;
    this._editExperienceUseCase = editExperienceUseCase;
    this._removeExperienceUseCase = removeExperienceUseCase;
    this._addEducationUseCase = addEducationUseCase;
    this._editEducationUseCase = editEducationUseCase;
    this._removeEducationUseCase = removeEducationUseCase;
    this._addResumeUseCase = addResumeUseCase;
  }
  editProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    // console.log('from edit profile req.user ', user);

    const payload: UpdataUserProfileInput = req.body;
    // console.log('payload from controller ', payload);

    if (!user) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }

    const data: CandidateProfileUpdateDto = { ...user };
    data.location = {
      country: payload.country ?? undefined,
      state: payload.state ?? undefined,
      place: payload.place ?? undefined,
    };
    data.name = payload.name ?? undefined;
    data.title = payload.title ?? undefined;
    data.socialMedidaLinks = payload.socialMediaLinks ?? undefined;
    //console.log('from candidate profile controller,data is ', data);
    try {
      const updated = await this._candidateEditProfileUsecase.execute(data);
      //  console.log('updated user from controller ', updated);
      const userProfile = UserMapper.toUserProfileDto(updated);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.PROFILE_UPDATED,
        user: userProfile,
      });
    } catch (error) {
      next(error);
    }
  };
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    //console.log('from get user');
    const userData = req.user;
    //console.log('user from token ', userData);
    try {
      if (!userData || !userData.userId || !userData.role) {
        throw new AppError(
          userMessages.error.NOT_FOUND,
          statusCodes.UNAUTHERIZED
        );
      }
      const user = await this._getUserUseCase.execute(
        userData.userId,
        userData.role
      );
      const userProfile = UserMapper.toUserProfileDto(user);

      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.USER_FETCHED,
        user: userProfile,
      });
    } catch (error) {
      next(error);
    }
  };

  editProfileImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //console.log('from edit image');
    const user = req.user;
    if (!user || !user.role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const file = req.file;
    if (!file) {
      throw new AppError(
        userMessages.error.IMAGE_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    }
    //   console.log('file ', file);

    const imageFile: UploadFileDto = {
      buffer: file.buffer,
      mimetype: file.mimetype,
      size: file.size,
      originalName: file.originalname,
    };
    try {
      const updatedUser = await this._editProfileImageUseCase.execute(
        user?.userId,
        user?.role,
        imageFile
      );
      //  console.log('updted user from controlleer image edit ', updatedUser);
      const userDto = UserMapper.toUserProfileDto(updatedUser);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.USER_PROFILE_IMAGE_UPDATED,
        user: userDto,
      });
    } catch (error) {
      next(error);
    }
  };
  removeProfileImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // console.log('from remove image controller');
    const user = req.user;
    if (!user) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }
    try {
      const updatedUser = await this._removeProfileImageUseCase.execute(
        user.userId,
        user.role
      );
      const userDto = UserMapper.toUserProfileDto(updatedUser);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.USER_PROFILE_IMAGE_REMOVED,
        user: userDto,
      });
    } catch (error) {
      next(error);
    }
  };
  addAbout = async (req: Request, res: Response, next: NextFunction) => {
    // console.log('from about controller');
    const user = req.user;

    try {
      if (!user || !user.role || !user.userId)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      const { value } = req.body;
      if (!value)
        throw new AppError(
          userMessages.error.NO_ABOUT_VALUE,
          statusCodes.BADREQUEST
        );
      const userUpdated = await this._editAboutUseCase.execute(
        user.userId,
        user.role,
        value
      );
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.USER_PROFILE_ABOUT_UPDATED,
        user: userUpdated,
      });
    } catch (error) {
      next(error);
    }
  };
  addSkill = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { skillId } = req.params;
    try {
      if (!user)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );

      if (!skillId) {
        throw new AppError(
          userMessages.error.SKILLID_NOT_FOUND,
          statusCodes.BADREQUEST
        );
      }
      const updated = await this._addSkillToProfileUseCase.execute(
        user.userId,
        skillId,
        user.role
      );
      const updatedUser = UserMapper.toUserProfileDto(updated);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.SKILL_ADDED,
        user: updatedUser,
      });
    } catch (error: any) {
      next(error);
    }
  };
  removeSkill = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { skillId } = req.params;
    // console.log('from remove skll conteoler,dkillid', skillId);

    try {
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      if (!skillId) {
        throw new AppError(
          userMessages.error.SKILLID_NOT_FOUND,
          statusCodes.BADREQUEST
        );
      }
      const updatedUser = await this._removeSkillUseCase.execute(
        user.userId,
        skillId,
        user.role
      );
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.SKILL_REMOVED,
        user: UserMapper.toUserProfileDto(updatedUser),
      });
    } catch (error) {
      next(error);
    }
  };
  addExperience = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from add experience controller');
    const user = req.user;
    try {
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );

      const payload: ExperienceDto = req.body;
      const updated = await this._addExperienceUseCase.execute(
        user.userId,
        user.role,
        payload
      );
      console.log('added experience form controller', updated);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.EXPERIENCE_ADDED,
        user: UserMapper.toUserProfileDto(updated),
      });
    } catch (error) {
      next(error);
    }
  };
  editExperience = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from edit experience controller');
    const user = req.user;
    try {
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );

      const payload: ExperienceDto = req.body;
      const { expId } = req.params;
      if (!expId)
        throw new AppError(
          userMessages.error.EXPEIENCE_ID_NOT_FOUND,
          statusCodes.BADREQUEST
        );
      const updated = await this._editExperienceUseCase.execute(
        user.userId,
        expId,
        user.role,

        payload
      );

      console.log('edited experience form controller', updated);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.EXPERIENCE_UPDATED,
        user: UserMapper.toUserProfileDto(updated),
      });
    } catch (error) {
      next(error);
    }
  };
  removeExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('remove experience');
    const user = req.user;
    try {
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );

      const { expId } = req.params;

      if (!expId)
        throw new AppError(
          userMessages.error.EXPEIENCE_ID_NOT_FOUND,
          statusCodes.BADREQUEST
        );
      const updated = await this._removeExperienceUseCase.execute(
        user.userId,
        user.role,
        expId
      );

      console.log('remove experience form controller', updated);
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.EXPEIENCE_REMOVED,
        user: UserMapper.toUserProfileDto(updated),
      });
    } catch (error) {
      next(error);
    }
  };
  addEducation = async (req: Request, res: Response, next: NextFunction) => {
    const payload: EducationType = req.body;
    const user = req.user;
    try {
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      const education = ProfileDataMapper.toEducationDto(payload);
      console.log('education from controller', education);

      const updatedUser = await this._addEducationUseCase.excecute(
        education,
        user.userId,
        user.role
      );

      return res.status(statusCodes.CREATED).json({
        success: true,
        message: userMessages.success.EDUCATION_ADDED,
        user: UserMapper.toUserProfileDto(updatedUser),
      });
    } catch (error) {
      next(error);
    }
  };
  editEducation = async (req: Request, res: Response, next: NextFunction) => {
    const payload: EducationType = req.body;
    const user = req.user;
    const { eduId } = req.params;
    try {
      if (!eduId)
        throw new AppError(
          userMessages.error.EDUCATION_ID_NOTFOUND,
          statusCodes.BADREQUEST
        );
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      const education = ProfileDataMapper.toEducationDto(payload);
      console.log('education from controller', education);

      const updatedUser = await this._editEducationUseCase.execute(
        education,
        eduId,
        user.role,
        user.userId
      );

      return res.status(statusCodes.CREATED).json({
        success: true,
        message: userMessages.success.EDUCATION_UPDATED,
        user: UserMapper.toUserProfileDto(updatedUser),
      });
    } catch (error) {
      next(error);
    }
  };
  deleteEducation = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { eduId } = req.params;

    try {
      if (!eduId)
        throw new AppError(
          userMessages.error.EDUCATION_ID_NOTFOUND,
          statusCodes.BADREQUEST
        );
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );

      const updatedUser = await this._removeEducationUseCase.execute(
        eduId,
        user.userId,
        user.role
      );
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.EDUCATION_REMOVED,
        user: UserMapper.toUserProfileDto(updatedUser),
      });
    } catch (error) {
      next(error);
    }
  };
  addResume = async (req: Request, res: Response, next: NextFunction) => {
    console.log('from upload resume controller');
    const user = req.user;
    try {
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      const file = req.file;
      if (!file) {
        throw new AppError(
          generalMessages.errors.RESUME_NOTFOUND,
          statusCodes.BADREQUEST
        );
      }
      const data: UploadFileDto = {
        mimetype: file?.mimetype,
        buffer: file.buffer,
        originalName: file.originalname,
        size: file.size,
      };
      const updatedUser = await this._addResumeUseCase.execute(
        data,
        user.userId,
        user.role
      );
      if (!updatedUser) {
        throw new AppError(userMessages.error.NOT_FOUND, statusCodes.NOTFOUND);
      }
      console.log(
        'after adding resume:',
        UserMapper.toUserProfileDto(updatedUser)
      );

      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.RESUME_ADDED,
        user: UserMapper.toUserProfileDto(updatedUser),
      });
    } catch (error) {
      next(error);
    }
  };
  removeResume = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;
    try {
      if (!user || !user.userId || !user.role)
        throw new AppError(
          authMessages.error.UNAUTHORIZED,
          statusCodes.UNAUTHERIZED
        );
      if (!id)
        throw new AppError(
          userMessages.error.RESUMEID_NOT_FOUND,
          statusCodes.BADREQUEST
        );

      const updatedUser = await this.removeResumeUseCase.execute(
        user.userId,
        id,
        user.role
      );
      return res.status(statusCodes.OK).json({
        success: true,
        message: userMessages.success.RESUME_DELETED,
        user: UserMapper.toUserProfileDto(updatedUser),
      });
    } catch (error: any) {
      next(error);
    }
  };
}

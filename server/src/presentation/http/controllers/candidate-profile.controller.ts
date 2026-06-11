import { Request, Response } from 'express';
import { IProfileEditUsecase } from '../../../applications/interfaces/candidate/update-profile.usecase';
import { CandidateProfileUpdateDto } from '../../../applications/dtos/candidate.dto';
import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import type { UpdataUserProfileInput } from '../validators/profile.validation';
import { userMessages } from '../../../shared/constants/messages/user.messages';
import { IGetUserUseCase } from '../../../applications/interfaces/user/get-user-data.usecase';
import { UserMapper } from '../../../applications/mappers/user.mapper';
import { IEditProfileImageUsecase } from '../../../applications/interfaces/user/update-image.usecase';
import { UploadFileDto } from '../../../applications/dtos/upload-file.dto';
import { IRemoveProfileImageUseCase } from '../../../applications/interfaces/user/remove-image.usecase';
import { IAddSkillToProfileUseCase } from '../../../applications/interfaces/candidate/add-skill-profile.usecase';
import { IEditAboutUseCase } from '../../../applications/interfaces/candidate/update-about.usecase';
import { IRemoveSkillFromProfileUseCase } from '../../../applications/interfaces/candidate/remove-skill.usecase';
import { ExperienceDto } from '../validators/profile.validation';
import { IAddExperienceUseCase } from '../../../applications/interfaces/candidate/add-experience.usecase';
import { IEditExperienceUseCase } from '../../../applications/interfaces/candidate/update-experience.usecase';
import { IRemoveExperienceUseCase } from '../../../applications/interfaces/candidate/remove-experience.usecase';
import { EducationType } from '../validators/education-form.validator';
import { ProfileDataMapper } from '../../../applications/mappers/profile-data.mapper';
import { asyncHandler } from '../middleweres/async-handler';
import { IAddEducationUseCase } from '../../../applications/interfaces/candidate/add-education.usecase';
import { IGetAllEducationUseCase } from '../../../applications/interfaces/candidate/get-educations.usecase';
import { IEditEducationUseCase } from '../../../applications/interfaces/candidate/update-education.usecase';
import { IRemoveEducationUseCase } from '../../../applications/interfaces/candidate/remove-education.usecase';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { IAddResumeUseCase } from '../../../applications/interfaces/candidate/add-redume.usecase';
import { IRemoveResumeUseCase } from '../../../applications/interfaces/candidate/remove-resume.usecase';
import { IGetCandidateResumesUsecase } from '../../../applications/useCases/candidate/get-resumes.usecase';

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
    private removeResumeUseCase: IRemoveResumeUseCase,
    private _getResumesUsecase: IGetCandidateResumesUsecase
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

  editProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

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

    const updated = await this._candidateEditProfileUsecase.execute(data);
    //  console.log('updated user from controller ', updated);
    const userProfile = UserMapper.toUserProfileDto(updated,null);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.PROFILE_UPDATED,
      user: userProfile,
    });
  });

  getUser = asyncHandler(async (req: Request, res: Response) => {
    //console.log('from get user');
    const userData = req.user;
    //console.log('user from token ', userData);

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
   

    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.USER_FETCHED,
      user,
    });
  });

  editProfileImage = asyncHandler(async (req: Request, res: Response) => {
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

    const updatedUser = await this._editProfileImageUseCase.execute(
      user?.userId,
      user?.role,
      imageFile
    );
    //  console.log('updted user from controlleer image edit ', updatedUser);
    const userDto = UserMapper.toUserProfileDto(updatedUser,null);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.USER_PROFILE_IMAGE_UPDATED,
      user: userDto,
    });
  });

  removeProfileImage = asyncHandler(async (req: Request, res: Response) => {
    // console.log('from remove image controller');
    const user = req.user;
    if (!user) {
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    }

    const updatedUser = await this._removeProfileImageUseCase.execute(
      user.userId,
      user.role
    );
    const userDto = UserMapper.toUserProfileDto(updatedUser,null);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.USER_PROFILE_IMAGE_REMOVED,
      user: userDto,
    });
  });

  addAbout = asyncHandler(async (req: Request, res: Response) => {
    // console.log('from about controller');
    const user = req.user;

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
  });

  addSkill = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { skillId } = req.params;

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
    const updatedUser = UserMapper.toUserProfileDto(updated,null);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.SKILL_ADDED,
      user: updatedUser,
    });
  });

  removeSkill = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { skillId } = req.params;
    // console.log('from remove skll conteoler,dkillid', skillId);

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
      user: UserMapper.toUserProfileDto(updatedUser,null),
    });
  });

  addExperience = asyncHandler(async (req: Request, res: Response) => {
    console.log('from add experience controller');
    const user = req.user;

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
      user: UserMapper.toUserProfileDto(updated,null),
    });
  });

  editExperience = asyncHandler(async (req: Request, res: Response) => {
    console.log('from edit experience controller');
    const user = req.user;

    if (!user || !user.userId || !user.role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const payload: ExperienceDto = req.body;
    const { experienceId } = req.params;
    if (!experienceId)
      throw new AppError(
        userMessages.error.EXPEIENCE_ID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    const updated = await this._editExperienceUseCase.execute(
      user.userId,
      experienceId,
      user.role,

      payload
    );

    console.log('edited experience form controller', updated);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.EXPERIENCE_UPDATED,
      user: UserMapper.toUserProfileDto(updated,null),
    });
  });

  removeExperience = asyncHandler(async (req: Request, res: Response) => {
    console.log('remove experience');
    const user = req.user;

    if (!user || !user.userId || !user.role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const { experienceId } = req.params;

    if (!experienceId)
      throw new AppError(
        userMessages.error.EXPEIENCE_ID_NOT_FOUND,
        statusCodes.BADREQUEST
      );
    const updated = await this._removeExperienceUseCase.execute(
      user.userId,
      user.role,
      experienceId
    );

    console.log('remove experience form controller', updated);
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.EXPEIENCE_REMOVED,
      user: UserMapper.toUserProfileDto(updated,null),
    });
  });

  addEducation = asyncHandler(async (req: Request, res: Response) => {
    const payload: EducationType = req.body;
    const user = req.user;

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
      user: UserMapper.toUserProfileDto(updatedUser,null),
    });
  });

  editEducation = asyncHandler(async (req: Request, res: Response) => {
    const payload: EducationType = req.body;
    const user = req.user;
    const { eduId } = req.params;

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
      user: UserMapper.toUserProfileDto(updatedUser,null),
    });
  });

  deleteEducation = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { eduId } = req.params;

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
      user: UserMapper.toUserProfileDto(updatedUser,null),
    });
  });

  addResume = asyncHandler(async (req: Request, res: Response) => {
    console.log('from upload resume controller');
    const user = req.user;

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
    const resume = await this._addResumeUseCase.execute(
      data,
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.RESUME_ADDED,
      resume,
    });
  });

  removeResume = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { resumeId } = req.params;

    if (!user || !user.userId || !user.role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    if (resumeId)
      throw new AppError(
        userMessages.error.RESUMEID_NOT_FOUND,
        statusCodes.BADREQUEST
      );

    const updatedUser = await this.removeResumeUseCase.execute(
      user.userId,
      resumeId,
      user.role
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: userMessages.success.RESUME_DELETED,
      user: UserMapper.toUserProfileDto(updatedUser,null),
    });
  });

  getResume = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { resumeId } = req.params;

    if (!user || !user.userId || !user.role)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    if (!resumeId)
      throw new AppError(
        userMessages.error.RESUMEID_NOT_FOUND,
        statusCodes.BADREQUEST
      );

    const resumes = await this._getResumesUsecase.execute(user.userId);
    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITY_DETAILS_FETCHED('Resumes '),
      resumes,
    });
  });
}

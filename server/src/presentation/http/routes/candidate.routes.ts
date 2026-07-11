import express from 'express';

import {
  profileValidator,
  experienceFormValidator,
} from '../middleweres/validatores/profile-validator';
import { authValidator } from '../middleweres/auth-validator';
import { tokenService,candidateDashboardController } from '../../../infrastructure/config/di';
import {
  candidateProfileController,
  userControlller,
} from '../../../infrastructure/config/di';
import { upload } from '../middleweres/image-upload';
import { educationValidator } from '../validators/education-form.validator';
import { fileUpload } from '../middleweres/pdf-upload';
import { API_END_POINTS } from './api-end-points/api-end.points';

const router = express.Router();

router.post(
  '/profile',
  profileValidator,
  authValidator(tokenService),
  candidateProfileController.editProfile
);
router.get(
  API_END_POINTS.PROFILE,
  authValidator(tokenService),
  candidateProfileController.getUser
);
router.patch(
  API_END_POINTS.PROFILE_IMAGE,
  authValidator(tokenService),
  upload.single('image'),
  candidateProfileController.editProfileImage
);
router.delete(
  API_END_POINTS.PROFILE_IMAGE,
  authValidator(tokenService),
  candidateProfileController.removeProfileImage
);
router.patch(
  API_END_POINTS.ABOUT,
  authValidator(tokenService),
  candidateProfileController.addAbout
);

router.post(
  API_END_POINTS.PROFILE_SKILLS,
  authValidator(tokenService),
  candidateProfileController.addSkill
);

router.patch(
  API_END_POINTS.PROFILE_SKILLS,
  authValidator(tokenService),
  candidateProfileController.removeSkill
);

router.post(
  API_END_POINTS.EXPERIENCES,
  authValidator(tokenService),
  experienceFormValidator,
  candidateProfileController.addExperience
);

router.put(
  API_END_POINTS.EXPERIENCE,
  authValidator(tokenService),
  experienceFormValidator,
  candidateProfileController.editExperience
);

router.patch(
 API_END_POINTS.EXPERIENCE,
  authValidator(tokenService),

  candidateProfileController.removeExperience
);

router.post(
 API_END_POINTS.EDUCATIONS,
  authValidator(tokenService),
  educationValidator,
  candidateProfileController.addEducation
);

router.put(
  API_END_POINTS.EDUCATION,
  authValidator(tokenService),
  educationValidator,
  candidateProfileController.editEducation
);

router.patch(
 API_END_POINTS.EDUCATION,
  authValidator(tokenService),
  educationValidator,
  candidateProfileController.deleteEducation
);

router.post(
API_END_POINTS.RESUMES,
  authValidator(tokenService),
  fileUpload.single('resume'),
  candidateProfileController.addResume
);

router.delete(
  API_END_POINTS.RESUME,
  authValidator(tokenService),
  candidateProfileController.removeResume
);

router.get(
  API_END_POINTS.GET_RESUMES,
  authValidator(tokenService),
  candidateProfileController.getResume
);
router.get(
  API_END_POINTS.STATUS_CARD_DATA,
  authValidator(tokenService),
  candidateDashboardController.statuscardData
);
router.get(
  API_END_POINTS.CANDIDATE_DASHBOARD.APP_DATA,
  authValidator(tokenService),
  candidateDashboardController.getAppData
);
router.get(
  API_END_POINTS.CANDIDATE_DASHBOARD.UPCOMING_INTERVIEW,
  authValidator(tokenService),
  candidateDashboardController.getUpcomingInterview
);
router.get(
  API_END_POINTS.CANDIDATE_DASHBOARD.PROFILE_DATA,
  authValidator(tokenService),
  candidateDashboardController.getProfileData
);
router.get(
  API_END_POINTS.CANDIDATE_DASHBOARD.RECOMENTED_JOBS,
  authValidator(tokenService),
  candidateDashboardController.getRecomentedJobs
);

router.get(API_END_POINTS.HOME, userControlller.getHomeData);
export default router;

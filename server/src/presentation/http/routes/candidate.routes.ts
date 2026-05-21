import express from 'express';

import {
  profileValidator,
  experienceFormValidator,
} from '../middleweres/validatores/profile-validator';
import { authValidator } from '../middleweres/auth-validator';
import { tokenService } from '../../../infrastructure/config/di';
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
  '/profile',
  authValidator(tokenService),
  candidateProfileController.getUser
);
router.patch(
  '/profile/image',
  authValidator(tokenService),
  upload.single('image'),
  candidateProfileController.editProfileImage
);
router.delete(
  '/profile/image',
  authValidator(tokenService),
  candidateProfileController.removeProfileImage
);
router.patch(
  '/profile/about',
  authValidator(tokenService),
  candidateProfileController.addAbout
);

router.post(
  '/profile/skills/:skillId',
  authValidator(tokenService),
  candidateProfileController.addSkill
);

router.patch(
  '/profile/skills/:skillId',
  authValidator(tokenService),
  candidateProfileController.removeSkill
);

router.post(
  '/profile/experience',
  authValidator(tokenService),
  experienceFormValidator,
  candidateProfileController.addExperience
);

router.put(
  '/profile/experience/:expId',
  authValidator(tokenService),
  experienceFormValidator,
  candidateProfileController.editExperience
);

router.patch(
  '/profile/experience/:expId',
  authValidator(tokenService),

  candidateProfileController.removeExperience
);

router.post(
  '/profile/education',
  authValidator(tokenService),
  educationValidator,
  candidateProfileController.addEducation
);

router.put(
  '/profile/education/:eduId',
  authValidator(tokenService),
  educationValidator,
  candidateProfileController.editEducation
);

router.patch(
  '/profile/education/:eduId',
  authValidator(tokenService),
  educationValidator,
  candidateProfileController.deleteEducation
);

router.post(
  '/profile/resume',
  authValidator(tokenService),
  fileUpload.single('resume'),
  candidateProfileController.addResume
);

router.delete(
  '/profile/resume/:id',
  authValidator(tokenService),
  candidateProfileController.removeResume
);

router.get(
  API_END_POINTS.GET_RESUMES,
  authValidator(tokenService),
  candidateProfileController.getResume
);

router.get('/home', userControlller.getHomeData);
export default router;

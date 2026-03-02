import express from 'express';
import {
  profileValidator,
  experienceFormValidator,
} from '../middleweres/validatores/profileValidator';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';
import { candidateProfileController } from '../../../infrastructure/config/di';
import { upload } from '../middleweres/imageUpload';
import { educationValidator } from '../validators/educationFormValidator';
import { fileUpload } from '../middleweres/pdfUpload';

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
router.patch(
  '/profile/skills/:skillId',
  authValidator(tokenService),
  candidateProfileController.addSkill
);
router.patch(
  '/profile/skills/remove/:skillId',
  authValidator(tokenService),
  candidateProfileController.removeSkill
);
router.patch(
  '/profile/experience/add',
  authValidator(tokenService),
  experienceFormValidator,
  candidateProfileController.addExperience
);
router.patch(
  '/profile/experience/edit/:expId',
  authValidator(tokenService),
  experienceFormValidator,
  candidateProfileController.editExperience
);
router.patch(
  '/profile/experience/remove/:expId',
  authValidator(tokenService),

  candidateProfileController.removeExperience
);

router.post(
  '/profile/education',
  authValidator(tokenService),
  educationValidator,
  candidateProfileController.addEducation
);
router.patch(
  '/profile/education/:eduId',
  authValidator(tokenService),
  educationValidator,
  candidateProfileController.editEducation
);
router.delete(
  '/profile/education/:eduId',
  authValidator(tokenService),
  educationValidator,
  candidateProfileController.deleteEducation
);
router.patch(
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
export default router;

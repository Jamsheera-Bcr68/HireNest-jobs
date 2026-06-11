import express from 'express';
import { authValidator } from '../middleweres/auth-validator';
import {
  jobController,
  tokenService,
  userControlller,
} from '../../../infrastructure/config/di';
import { COMPANY_API_ENDPOINTS } from './api-end-points/company';
import {
  companyRegisterValidator,
  companyProfileEditValidator,
} from '../middleweres/validatores/company/company-form-validator';
import { upload } from '../middleweres/image-upload';
import { fileUpload } from '../middleweres/pdf-upload';
import { companyProfileController } from '../../../infrastructure/config/di';
import { companyProfileUpdateFieldsValidator } from '../middleweres/validatores/company/company-form-validator';
import { jobValidator } from '../middleweres/validatores/company/job-validator';
import { API_END_POINTS } from './api-end-points/api-end.points';
const router = express.Router();

router.post(
  API_END_POINTS.COMPANIES,
  authValidator(tokenService),
  companyRegisterValidator,
  companyProfileController.companyRegister
);

router.patch(
API_END_POINTS.LOGO,
  authValidator(tokenService),
  upload.single('logo'),
  companyProfileController.logoUpdate
);
router.patch(
 API_END_POINTS.PROFILE_LOGO,
  authValidator(tokenService),
  upload.single('logo'),
  companyProfileController.changeLogo
);
router.patch(
  API_END_POINTS.DOCUMENT,
  authValidator(tokenService),
  fileUpload.single('verification_document'),
  companyProfileController.addDocument
);
router.delete(
API_END_POINTS.PROFILE_LOGO,
  authValidator(tokenService),

  companyProfileController.removeLogo
);
router.get(
  API_END_POINTS.COMPANIES,
  authValidator(tokenService),
  companyProfileController.getCompany
);
router.patch(
  API_END_POINTS.PROFILE,
  authValidator(tokenService),
  companyProfileEditValidator,
  companyProfileController.updateProfile
);

router.patch(
  API_END_POINTS.UPDATE_PROFILE,
  authValidator(tokenService),
  companyProfileUpdateFieldsValidator,
  companyProfileController.updateFields
);
router.get(
  COMPANY_API_ENDPOINTS.GET_POST_STATUS,
  authValidator(tokenService),
  jobController.getJobStatus
);
router.patch(
  API_END_POINTS.JOB,
  authValidator(tokenService),
  jobController.updateStatus
);
router.put(
  API_END_POINTS.JOB,
  authValidator(tokenService),
  jobValidator,
  jobController.updateJob
);
router.get(
  API_END_POINTS.COMPANY_DATA,
  authValidator(tokenService),
  userControlller.getCompany
);
router.put(
  API_END_POINTS.COMPANIES,
  companyRegisterValidator,
  authValidator(tokenService),
  userControlller.updateCompany
);

export default router;

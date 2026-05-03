import express from 'express';
import { authValidator } from '../middleweres/authValidator';
import {
  jobController,
  tokenService,
  userControlller,
} from '../../../infrastructure/config/di';
import { COMPANY_API_ENDPOINTS } from './api-end-points/company';
import {
  companyRegisterValidator,
  companyProfileEditValidator,
} from '../middleweres/validatores/company/companyFormValidator';
import { upload } from '../middleweres/imageUpload';
import { fileUpload } from '../middleweres/pdfUpload';
import { companyProfileController } from '../../../infrastructure/config/di';
import { companyProfileUpdateFieldsValidator } from '../middleweres/validatores/company/companyFormValidator';
import { jobValidator } from '../middleweres/validatores/company/jobValidator';
import { API_END_POINTS } from './api-end-points/api-end.points';
const router = express.Router();

router.post(
  '/register',
  authValidator(tokenService),
  companyRegisterValidator,
  companyProfileController.companyRegister
);

router.patch(
  '/logo',
  authValidator(tokenService),
  upload.single('logo'),
  companyProfileController.logoUpdate
);
router.patch(
  '/profile/logo',
  authValidator(tokenService),
  upload.single('logo'),
  companyProfileController.changeLogo
);
router.patch(
  '/profle/document',
  authValidator(tokenService),
  fileUpload.single('verification_document'),
  companyProfileController.addDocument
);
router.delete(
  '/profile/logo',
  authValidator(tokenService),

  companyProfileController.removeLogo
);
router.get(
  '/',
  authValidator(tokenService),
  companyProfileController.getCompany
);
router.patch(
  '/profile',
  authValidator(tokenService),
  companyProfileEditValidator,
  companyProfileController.updateProfile
);

router.patch(
  '/profile/fields',
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
  COMPANY_API_ENDPOINTS.UPDATE_JOBSTATUS,
  authValidator(tokenService),
  jobController.updateStatus
);
router.put(
  COMPANY_API_ENDPOINTS.UPDATE_JOB,
  authValidator(tokenService),
  jobValidator,
  jobController.updateJob
);
router.get(
  API_END_POINTS.COMPANY_DATA,
  authValidator(tokenService),
  userControlller.getCompany
);

export default router;

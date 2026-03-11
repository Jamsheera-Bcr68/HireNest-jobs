import express from 'express';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';
import {
  companyRegisterValidator,
  companyProfileEditValidator,
} from '../middleweres/validatores/company/companyFormValidator';
import { upload } from '../middleweres/imageUpload';
import { fileUpload } from '../middleweres/pdfUpload';
import { companyProfileController } from '../../../infrastructure/config/di';
import { companyProfileUpdateFieldsValidator } from '../middleweres/validatores/company/companyFormValidator';
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
)


export default router;

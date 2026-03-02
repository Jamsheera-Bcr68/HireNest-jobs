import express from 'express';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';
import { companyRegisterValidator } from '../middleweres/validatores/company/companyFormValidator';
import { upload } from '../middleweres/imageUpload';
import { fileUpload } from '../middleweres/pdfUpload';
import { companyProfileController } from '../../../infrastructure/config/di';
const router = express.Router();

router.post(
  '/register',
  authValidator(tokenService),
  companyRegisterValidator,
  companyProfileController.companyRegister
);
router.patch(
  '/profile/image',
  authValidator(tokenService),
  upload.single('logo'),
  companyProfileController.logoUpdate
);
router.patch(
  '/profle/document',
  authValidator(tokenService),
  fileUpload.single('verification_document'),
  companyProfileController.addDocument
);
export default router;

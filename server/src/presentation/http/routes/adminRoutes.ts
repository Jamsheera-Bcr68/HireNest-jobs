import express from 'express';
import { authValidator } from '../middleweres/authValidator';
import {
  tokenService,
  adminUserController,
} from '../../../infrastructure/config/di';
const router = express.Router();

router.get(
  '/companies',
  authValidator(tokenService),
  adminUserController.getAllCompanies
);
router.get(
  '/companies/:id',
  authValidator(tokenService),
  adminUserController.getCompany
);
router.patch(
  '/companies/:id',
  authValidator(tokenService),
  adminUserController.updateCompany
);
router.get(
  '/company-status',
  authValidator(tokenService),
  adminUserController.getCompanyStatus
);
router.get(
  '/candidates-status',
  authValidator(tokenService),
  adminUserController.getCandidateStatus
);
router.get(
  '/candidates',
  authValidator(tokenService),
  adminUserController.getCandidates
);
router.patch(
  '/candidates/:id',
  authValidator(tokenService),
  adminUserController.updateCandidates
);
router.get(
  '/candidates/:id',
  authValidator(tokenService),
  adminUserController.getCandidate
);
router.get(
  '/check-fileExist',
  authValidator(tokenService),
  adminUserController.checkFileExist
);

export default router;

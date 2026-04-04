import express from 'express';
import { authValidator } from '../middleweres/authValidator';
import { ADMIN_API_ENDPOINTS } from './api-end-points/admin';
import {
  tokenService,
  adminUserController,
  adminJobcontroller,
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
router.get(
  ADMIN_API_ENDPOINTS.GET_POST_STATUS,
  authValidator(tokenService),
  adminJobcontroller.getJobStatus
);
router.get(
  ADMIN_API_ENDPOINTS.JOBS,
  authValidator(tokenService),
  adminJobcontroller.getJobs
);
router.patch(
  ADMIN_API_ENDPOINTS.UPDATE_JOBSTATUS,
  authValidator(tokenService),
  adminJobcontroller.updateJobStatus
);
router.get(
  ADMIN_API_ENDPOINTS.JOB_DETAILS,
  authValidator(tokenService),
  adminJobcontroller.getJobDetails
);

export default router;

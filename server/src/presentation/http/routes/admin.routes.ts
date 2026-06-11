import express from 'express';
import { authValidator } from '../middleweres/auth-validator';
import { ADMIN_API_ENDPOINTS } from './api-end-points/admin';
import {
  tokenService,
  adminUserController,
  adminJobcontroller,
} from '../../../infrastructure/config/di';
const router = express.Router();

router.get(
  ADMIN_API_ENDPOINTS.COMPANIES,
  authValidator(tokenService),
  adminUserController.getAllCompanies
);
router.get(
  ADMIN_API_ENDPOINTS.COMPANY,
  authValidator(tokenService),
  adminUserController.getCompany
);
router.patch(
  ADMIN_API_ENDPOINTS.COMPANY,
  authValidator(tokenService),
  adminUserController.updateCompany
);
router.get(
  ADMIN_API_ENDPOINTS.COMPANY_STATUS,
  authValidator(tokenService),
  adminUserController.getCompanyStatus
);
router.get(
  ADMIN_API_ENDPOINTS.CANDIDATE_STATUS,
  authValidator(tokenService),
  adminUserController.getCandidateStatus
);
router.get(
  ADMIN_API_ENDPOINTS.CANDIDATES,
  authValidator(tokenService),
  adminUserController.getCandidates
);
router.patch(
  ADMIN_API_ENDPOINTS.CANDIDATE,
  authValidator(tokenService),
  adminUserController.updateCandidates
);
router.get(
  ADMIN_API_ENDPOINTS.CANDIDATE,
  authValidator(tokenService),
  adminUserController.getCandidate
);
router.get(
  ADMIN_API_ENDPOINTS.CHECK_FILE_EXIST,
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
  ADMIN_API_ENDPOINTS.JOB,
  authValidator(tokenService),
  adminJobcontroller.updateJobStatus
);
router.get(
  ADMIN_API_ENDPOINTS.JOB,
  authValidator(tokenService),
  adminJobcontroller.getJobDetails
);

export default router;

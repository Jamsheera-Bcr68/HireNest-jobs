import express from 'express';
import { authValidator } from '../middleweres/auth-validator';
import { ADMIN_API_ENDPOINTS } from './api-end-points/admin';
import { API_END_POINTS } from './api-end-points/api-end.points';
import {
  tokenService,
  adminUserController,
  adminJobcontroller,
} from '../../../infrastructure/config/di';
import {
  adminDashboarController,
  activityController,
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

router.get(
  API_END_POINTS.STATUS_CARD_DATA,
  authValidator(tokenService),
  adminDashboarController.getStatusCardData
);

router.get(
  API_END_POINTS.ADMIN_DASHBOARD.COMPANY_JOB_CHARTDATA,
  authValidator(tokenService),
  adminDashboarController.getCompanyJobChartData
);
router.get(
  API_END_POINTS.ADMIN_DASHBOARD.JOBCOUNTBY_INDUSTRY,
  authValidator(tokenService),
  adminDashboarController.getIndustrywiseJobCount
);
router.get(
  API_END_POINTS.ADMIN_DASHBOARD.USER_DISTRIBUTION,
  authValidator(tokenService),
  adminDashboarController.getUserDistribution
);
router.get(
  API_END_POINTS.ADMIN_DASHBOARD.APP_DISTRIBUTION,
  authValidator(tokenService),
  adminDashboarController.getApplicationDistribution
);
router.get(
  API_END_POINTS.ADMIN_DASHBOARD.INTERVIEW_DATA,
  authValidator(tokenService),
  adminDashboarController.getInterviewData
);
router.get(
  API_END_POINTS.ADMIN_DASHBOARD.PENDING_COMPANIES,
  authValidator(tokenService),
  adminDashboarController.getPendingCompanies
);
router.get(
  API_END_POINTS.ADMIN_DASHBOARD.REPORTED_JOBS,
  authValidator(tokenService),
  adminDashboarController.getReportedJobs
);
router.get(
  API_END_POINTS.PENDINGS_STATUS,
  authValidator(tokenService),
  activityController.getPendingStatusData
);
router.get(
  API_END_POINTS.PENDINGS,
  authValidator(tokenService),
  activityController.getAllPendings
);

export default router;

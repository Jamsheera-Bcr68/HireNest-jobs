import express from 'express';
import { CANDIDATE_API_END_POINTS } from './api-end-points/candidate';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';
import { applicationController } from '../../../infrastructure/config/di';
import { API_END_POINTS } from './api-end-points/api-end.points';
const router = express.Router();

router.post(
  CANDIDATE_API_END_POINTS.APPLY_JOB,
  authValidator(tokenService),
  applicationController.applyJob
);
router.get(
  API_END_POINTS.APPLICATION_STATUS,
  authValidator(tokenService),
  applicationController.getApplicationStatus
);
router.get(
  API_END_POINTS.APPLICATIONS,
  authValidator(tokenService),
  applicationController.getApplications
);
router.get(
  API_END_POINTS.APPLICATION,
  authValidator(tokenService),
  applicationController.getApplicationDetails
);
router.patch(
  API_END_POINTS.APPLICATION,
  authValidator(tokenService),
  applicationController.updateAppStatus
);

export default router;

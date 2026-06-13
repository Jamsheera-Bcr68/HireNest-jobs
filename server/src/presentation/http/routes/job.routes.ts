import express from 'express';
import { authValidator } from '../middleweres/auth-validator';
import { applicationController, tokenService } from '../../../infrastructure/config/di';
import {
  jobValidator,
  reportJobValidator,
} from '../middleweres/validatores/company/job-validator';
import { jobController } from '../../../infrastructure/config/di';
import { API_END_POINTS } from './api-end-points/api-end.points';
const router = express.Router();

router.post(
  API_END_POINTS.JOBS,
  authValidator(tokenService),
  jobValidator,
  jobController.create
);
router.get(API_END_POINTS.JOBS, jobController.getJobs);
router.get(API_END_POINTS.SAVED_JOBS, authValidator(tokenService), jobController.getSavedJobs);
router.get(API_END_POINTS.JOB, jobController.getJobDetails);
router.post(
  API_END_POINTS.REPORT_JOB,
  authValidator(tokenService),
  reportJobValidator,
  jobController.reportJob
);
router.post(
  API_END_POINTS.SAVE_JOB,
  authValidator(tokenService),

  jobController.saveJob
);
router.delete(
 API_END_POINTS.UNSAVE_JOB,
  authValidator(tokenService),

  jobController.unSaveJob
);
router.put(
  API_END_POINTS.UNSAVE_JOB,
  authValidator(tokenService),

  jobController.unSaveJob
);
router.get(API_END_POINTS.JOB_APPLICATIONS,authValidator(tokenService),applicationController.getJobApplications)
export default router;

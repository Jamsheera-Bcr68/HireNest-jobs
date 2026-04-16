import express from 'express';
import { CANDIDATE_API_END_POINTS } from './api-end-points/candidate';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';
import { applicationController } from '../../../infrastructure/config/di';
const router = express.Router();

router.post(
  CANDIDATE_API_END_POINTS.APPLY_JOB,
  authValidator(tokenService),
  applicationController.applyJob
);

export default router;

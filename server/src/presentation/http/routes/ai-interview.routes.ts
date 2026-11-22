import express from 'express';
import { audioUpload } from '../middleweres/pdf-upload';
import {
  aiSessionController,
  tokenService,
} from '../../../infrastructure/config/di';
import { authValidator } from '../middleweres/auth-validator';
const router = express.Router();
import { API_END_POINTS } from './api-end-points/api-end.points';

router.post(
  API_END_POINTS.AI_MEETING,
  authValidator(tokenService),
  aiSessionController.startAiInterview
);
router.patch(
  API_END_POINTS.AI_SESSION,
  authValidator(tokenService),
  aiSessionController.updateAiSession
);
router.post(
  API_END_POINTS.SUBMIT_AI_ANSWER,
  authValidator(tokenService),
  audioUpload.single('audio'),
  aiSessionController.submitAnswer
);
router.patch(
  API_END_POINTS.REPORT_VIOLATION,
  authValidator(tokenService),
  aiSessionController.reportViolation
);

export default router;

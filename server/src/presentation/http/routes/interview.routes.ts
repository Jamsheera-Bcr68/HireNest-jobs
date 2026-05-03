import express, { Router } from 'express';
import { interviewcontroller } from '../../../infrastructure/config/di';

const router = express.Router();
import { interviewValidator } from '../middleweres/validatores/company/interview.validate';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';
import { API_END_POINTS } from './api-end-points/api-end.points';

router.post(
  API_END_POINTS.INTERVIEWS,
  authValidator(tokenService),
  interviewValidator,
  interviewcontroller.scheduleInterview
);
router.put(
  API_END_POINTS.INTERVIEW,
  authValidator(tokenService),
  interviewValidator,
  interviewcontroller.updateInterview
);
router.get(
  API_END_POINTS.INTERVIEWS,
  authValidator(tokenService),
  interviewValidator,
  interviewcontroller.getInterviews
);
router.get(
  API_END_POINTS.INTERVIEWS_STATUS,
  authValidator(tokenService),
  interviewValidator,
  interviewcontroller.getSatuses
);
router.patch(
  API_END_POINTS.UPDATE_STATUS,
  authValidator(tokenService),
  interviewValidator,
  interviewcontroller.updateStatus
);
router.get(
  API_END_POINTS.INTERVIEW,
  authValidator(tokenService),
  interviewValidator,
  interviewcontroller.getInterview
);
router.patch(
  API_END_POINTS.INTERVIEW_RESULT,
  authValidator(tokenService),
  interviewcontroller.updateInterviewResult
);

export default router;

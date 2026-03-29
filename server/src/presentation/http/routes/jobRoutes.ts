import express from 'express';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';
import {
  jobValidator,
  reportJobValidator,
} from '../middleweres/validatores/company/jobValidator';
import { jobController } from '../../../infrastructure/config/di';
const router = express.Router();

router.post(
  '/',
  authValidator(tokenService),
  jobValidator,
  jobController.create
);
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobDetails);
router.post(
  '/:id/reports',
  authValidator(tokenService),
  reportJobValidator,
  jobController.reportJob
);
export default router;

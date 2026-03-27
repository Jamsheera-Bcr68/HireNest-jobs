import express from 'express';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';
import { jobValidator } from '../middleweres/validatores/company/jobValidator';
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
export default router;

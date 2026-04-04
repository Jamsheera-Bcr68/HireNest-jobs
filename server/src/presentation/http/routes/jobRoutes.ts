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
router.get('/saved', authValidator(tokenService), jobController.getSavedJobs);
router.get('/:id', jobController.getJobDetails);
router.post(
  '/:id/reports',
  authValidator(tokenService),
  reportJobValidator,
  jobController.reportJob
);
router.post(
  '/:id/save',
  authValidator(tokenService),

  jobController.saveJob
);
router.delete(
  '/:id/unsave',
  authValidator(tokenService),

  jobController.unSaveJob
);
router.put(
  '/:id/unsave',
  authValidator(tokenService),

  jobController.unSaveJob
);
export default router;

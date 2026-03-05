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
export default router;

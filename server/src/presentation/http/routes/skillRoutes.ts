import { skillController } from '../../../infrastructure/config/di';
import { authValidator } from '../middleweres/authValidator';
import { tokenService } from '../../../infrastructure/config/di';

import express from 'express';
const router = express.Router();

router.get('/', authValidator(tokenService), skillController.getAllSkills);
router.post('/', authValidator(tokenService), skillController.addSkill);

export default router;

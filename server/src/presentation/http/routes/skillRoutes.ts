import { skillController } from '../../../infrastructure/config/di';

import express from 'express';
const router = express.Router();

router.get('/', skillController.getAllSkills);
router.patch('/', skillController.getAllSkills);

export default router;

import { skillController } from '../../../infrastructure/config/di';
import { authValidator } from '../middleweres/authValidator';
import { API_END_POINTS } from './api-end-points/api-end.points';
import { tokenService } from '../../../infrastructure/config/di';

import express from 'express';
const router = express.Router();

router.get(
  API_END_POINTS.SKILLS,
  authValidator(tokenService),
  skillController.getAllSkills
);
router.get(
  API_END_POINTS.REQUESTED_SKILLS,
  authValidator(tokenService),
  skillController.getAllRequestedSkills
);
router.post(
  API_END_POINTS.SKILLS,
  authValidator(tokenService),
  skillController.addSkill
);
router.get(
  API_END_POINTS.SKILL_STATUS,
  authValidator(tokenService),
  skillController.getSkillStatus
);
router.patch(
  API_END_POINTS.SKILL,
  authValidator(tokenService),
  skillController.updateSkillStatus
);
router.put(
  API_END_POINTS.SKILL,
  authValidator(tokenService),
  skillController.updateSkill
);

export default router;

import { SkillStatus } from '../../../domain/enums/skillEnum';

export const skillMessages = {
  error: {
    SKILL_ID_NOTfOUND: 'Skill id is not found',
    SKILL_NOT_FOUND: 'Skill Not found',
    SKILL_ALREADY_EXIST: 'Skill name already exist',
    SKILL_ALREADY_EXIST_PENDING: 'Skill name already Waiting for approval',
    SKILL_EDIT_NOT_ALLOWED: 'Skill Editing not allowed',
    SKILL_REMOVE_NOT_ALLOWED: 'Skill Removal not allowed',
  },
  success: {
    STATUS_FETCHED: 'Skill status fetched successfully',
    SKILL_UPDATED: 'Skill updated successfully',
    STATUS_STATUS_UPDATED: (status: SkillStatus) =>
      `Skill status ${status} successfully`,
  },
};

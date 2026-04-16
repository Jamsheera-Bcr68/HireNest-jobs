import axiosInstance from '../../libraries/axios';
import { API_ENDPOINTS } from '../../constants/apiEndPoints/general';
import { type SkillFilterType } from '../../presentation/components/admin/skills/SkillsContainer';
import type { SkillStatusType } from '../../types/dtos/skillTypes';

export const skillService = {
  async getSkills(
    filter: SkillFilterType,
    limit: number = 10,
    page: number = 1,
    sortBy: string = 'newest'
  ) {
    console.log('skill filter,sortby', filter);
    sortBy = sortBy.trim();

    const res = await axiosInstance.get(API_ENDPOINTS.ALL_SKILLS, {
      params: { ...filter, limit, page, sortBy },
    });
    return res.data;
  },
  async getRequestedSkills(
    filter: SkillFilterType,
    limit: number = 10,
    page: number = 1,
    sortBy: string = 'newest'
  ) {
    console.log(' requested skill filter,sortby', filter);
    sortBy = sortBy.trim();

    const res = await axiosInstance.get(API_ENDPOINTS.REQUESTED_SKILLS, {
      params: { ...filter, limit, page, sortBy },
    });
    return res.data;
  },

  async addNewSkill(skill: string) {
    const res = await axiosInstance.post(API_ENDPOINTS.ALL_SKILLS, { skill });
    return res.data;
  },
  async updateSkill(id: string, skill: string) {
    console.log('from update skill', skill, id);

    const res = await axiosInstance.put(API_ENDPOINTS.SKILL(id), { skill });
    return res.data;
  },

  async getSkillStatus() {
    const res = await axiosInstance.get(API_ENDPOINTS.SKILLS_STATUS);
    return res.data;
  },

  async updateStatus(
    skillId: string,
    status: SkillStatusType,
    reason?: string
  ) {
    console.log('skillid,status,reason', skillId, status, reason);

    const res = await axiosInstance.patch(API_ENDPOINTS.SKILL(skillId), {
      status,
      reason,
    });
    return res.data;
  },
};

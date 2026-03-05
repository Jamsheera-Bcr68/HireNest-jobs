import axiosInstance from '../../libraries/axios';

export const skillService = {
  async getSkills() {
    const res = await axiosInstance.get(`/skills?status=${'approved'}`);
    return res.data;
  },
  async addNewSkill(skill: string) {
    const res = await axiosInstance.post('/skills', { skill });
    return res.data;
  },
};

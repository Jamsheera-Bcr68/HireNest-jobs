import axiosInstance from '../../libraries/axios';
import { type AddExperienceFormData } from '../../libraries/validations/auth/candidate/experienceFormValidation';
import { type EducationFormData } from '../../libraries/validations/auth/candidate/educationFormValidation';

export const profileService = {
  async addExperience(formData: AddExperienceFormData) {
    console.log('from data from service', formData);

    const response = await axiosInstance.patch(
      '/candidate/profile/experience/add',
      formData
    );
    return response.data;
  },
  async editExperience(formData: AddExperienceFormData, expId: string) {
    const response = await axiosInstance.patch(
      `/candidate/profile/experience/edit/${expId}`,
      formData
    );
    return response.data;
  },
  async removeExperience(expId: string) {
    const res = await axiosInstance.patch(
      `/candidate/profile/experience/remove/${expId}`
    );
    return res.data;
  },

  async addEducation(formData: EducationFormData) {
    const res = await axiosInstance.post(
      '/candidate/profile/education',
      formData
    );
    return res.data;
  },
  async editEducation(formData: EducationFormData, eduId: string) {
    const res = await axiosInstance.patch(
      `/candidate/profile/education/${eduId}`,
      formData
    );
    return res.data;
  },
  async deleteEducation(eduId: string) {
    const res = await axiosInstance.delete(
      `/candidate/profile/education/${eduId}`
    );
    return res.data;
  },

  async addSkill(skillId: string) {
    console.log('from candidate skillservice', skillId);

    const res = await axiosInstance.patch(
      `/candidate/profile/skills/${skillId}`
    );
    return res.data;
  },

  async removeSkill(skillId: string) {
    const response = await axiosInstance.patch(
      `/candidate/profile/skills/remove/${skillId}`
    );
    return response.data;
  },
  async uploadResume(formData: FormData) {
    const res = await axiosInstance.patch(
      '/candidate/profile/resume',
      formData
    );
    return res.data;
  },
  async removeResume(id: string) {
    const res = await axiosInstance.delete(`/candidate/profile/resume/${id}`);
    return res.data;
  },
};

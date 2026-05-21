import axiosInstance from '../../libraries/axios';
import { CANDIDATE_API_ENDPOINTS } from '../../constants/api-end-points/candidate';
import { type AddExperienceFormData } from '../../libraries/validations/auth/candidate/experience-form.validation';
import { type EducationFormData } from '../../libraries/validations/auth/candidate/education-form.validation';
import type { ProfileFormType } from '../../libraries/validations/auth/candidate/profile.validation';

export const profileService = {
  async getProfile() {
    const res = await axiosInstance.get(CANDIDATE_API_ENDPOINTS.PROFILE);
    return res.data;
  },

  async addExperience(formData: AddExperienceFormData) {
    console.log('from data from service', formData);

    const response = await axiosInstance.post(
      CANDIDATE_API_ENDPOINTS.ADD_EXPERIENCE,
      formData
    );
    return response.data;
  },

  async editExperience(formData: AddExperienceFormData, expId: string) {
    console.log('from editing experience', formData);

    const response = await axiosInstance.put(
      CANDIDATE_API_ENDPOINTS.UPDATE_EXPERIENCE(expId),
      formData
    );
    return response.data;
  },

  async removeExperience(expId: string) {
    const res = await axiosInstance.patch(
      CANDIDATE_API_ENDPOINTS.REMOVE_EXPERIENCE(expId)
    );
    return res.data;
  },

  async addEducation(formData: EducationFormData) {
    const res = await axiosInstance.post(
      CANDIDATE_API_ENDPOINTS.ADD_EDUCATION,
      formData
    );
    return res.data;
  },

  async editEducation(formData: EducationFormData, eduId: string) {
    const res = await axiosInstance.put(
      CANDIDATE_API_ENDPOINTS.UPDATE_EDUCATION(eduId),
      formData
    );
    return res.data;
  },

  async deleteEducation(eduId: string) {
    const res = await axiosInstance.patch(
      CANDIDATE_API_ENDPOINTS.REMOVE_EDUCATION(eduId)
    );
    return res.data;
  },

  async addSkill(skillId: string) {
    console.log('from candidate skillservice', skillId);

    const res = await axiosInstance.post(
      CANDIDATE_API_ENDPOINTS.ADD_SKILL(skillId)
    );
    return res.data;
  },

  async removeSkill(skillId: string) {
    const response = await axiosInstance.patch(
      CANDIDATE_API_ENDPOINTS.REMOVE_SKILL(skillId)
    );
    return response.data;
  },

  async uploadResume(formData: FormData) {
    const res = await axiosInstance.post(
      CANDIDATE_API_ENDPOINTS.ADD_RESUME,
      formData
    );
    return res.data;
  },

  async removeResume(id: string) {
    const res = await axiosInstance.delete(
      CANDIDATE_API_ENDPOINTS.DELETE_RESUME(id)
    );
    return res.data;
  },

  async saveImage(formData: FormData) {
    const response = await axiosInstance.patch(
      CANDIDATE_API_ENDPOINTS.PROFILE_IMAGE,
      formData
    );
    return response.data;
  },

  async removeImage() {
    const response = await axiosInstance.delete(
      CANDIDATE_API_ENDPOINTS.PROFILE_IMAGE
    );
    return response.data;
  },

  async updateProfile(formData: ProfileFormType) {
    const response = await axiosInstance.post(
      CANDIDATE_API_ENDPOINTS.PROFILE,
      formData
    );
    return response.data;
  },

  async addAvbout(value: string) {
    const res = await axiosInstance.patch(CANDIDATE_API_ENDPOINTS.ABOUT, {
      value: value,
    });
    return res.data;
  },

  async addSkilltoProfile(skillName: string) {
    const res = await axiosInstance.patch('/candidate/profile/skills/add', {
      skillName,
    });
    return res.data;
  },
};

export const candidateService = {
  async getHomeData() {
    const res = await axiosInstance.get(CANDIDATE_API_ENDPOINTS.HOME_DATA);
    return res.data;
  },

  async getResumes(id: string) {
    const res = await axiosInstance.get(CANDIDATE_API_ENDPOINTS.RESUMES(id));
    return res.data;
  },
};

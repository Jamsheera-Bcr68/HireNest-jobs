import axiosInstance from '../../libraries/axios';
import { CANDIDATE_API_ENDPOINTS } from '../../constants/apiEndPoints/candidate';
import { type AddExperienceFormData } from '../../libraries/validations/auth/candidate/experienceFormValidation';
import { type EducationFormData } from '../../libraries/validations/auth/candidate/educationFormValidation';

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
};

export const candidateService = {
  async getHomeData() {
    const res = await axiosInstance.get(CANDIDATE_API_ENDPOINTS.HOME_DATA);
    return res.data;
  },

  async applyJob(jobId: string) {
    console.log('job id from service', jobId);
    const res = await axiosInstance.post(
      CANDIDATE_API_ENDPOINTS.APPLY_JOB(jobId)
    );
    return res.data;
  },
};

import axiosInstance from '../../libraries/axios';
import { type CompanyRegisterType } from '../../libraries/validations/company/company-register.validator';
import { type CompanyProfileEditType } from '../../libraries/validations/company/company-editForm.validation';
import type { ISocialLinks } from '../../types/profile.types';

import { API_ENDPOINTS } from '../../constants/api-end-points/general';

export const companyService = {
  async getCompany() {
    const res = await axiosInstance.get(API_ENDPOINTS.COMPANY);
    return res.data;
  },

  async uploadLogo(formData: FormData) {
    const res = await axiosInstance.patch(API_ENDPOINTS.COMPANY_LOGO, formData);
    return res.data;
  },

  async uploadDocument(formdata: FormData) {
    const data = await axiosInstance.patch(
      API_ENDPOINTS.COMPANY_DOCUMENT,
      formdata
    );
    return data;
  },

  async registerCompany(data: CompanyRegisterType) {
    console.log('from services', data);

    const res = await axiosInstance.post(API_ENDPOINTS.COMPANY, data);
    return res.data;
  },

  async changeLogo(formData: FormData) {
    const res = await axiosInstance.patch(API_ENDPOINTS.LOGO, formData);
    return res.data;
  },

  async removeLogo() {
    const res = await axiosInstance.delete(API_ENDPOINTS.LOGO);
    return res.data;
  },

  async editProfile(formData: CompanyProfileEditType) {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.COMPANY_PROFILE,
      formData
    );
    return res.data;
  },

  async addAbout(value: string) {
    const data = {
      about: value,
    };
    const res = await axiosInstance.patch(API_ENDPOINTS.COMPANY_FIELDS, data);
    return res.data;
  },

  async addVision(value: string) {
    const data = {
      vision: value,
    };
    const res = await axiosInstance.patch(API_ENDPOINTS.COMPANY_FIELDS, data);
    return res.data;
  },

  async addMission(value: string) {
    const data = {
      mission: value,
    };
    const res = await axiosInstance.patch(API_ENDPOINTS.COMPANY_FIELDS, data);
    return res.data;
  },

  async addCulture(value: string) {
    const data = {
      culture: value,
    };
    const res = await axiosInstance.patch(API_ENDPOINTS.COMPANY_FIELDS, data);
    return res.data;
  },

  async addLink(formData: ISocialLinks) {
    const res = await axiosInstance.patch(API_ENDPOINTS.COMPANY_FIELDS, {
      socialMediaLinks: formData,
    });
    return res.data;
  },

  async getCompanyDetails(id: string) {
    console.log('company id', id);

    const res = await axiosInstance.get(API_ENDPOINTS.COMPANY_DATA(id));
    return res.data;
  },

  async updateCompany(data: CompanyRegisterType) {
    console.log('from update services', data);

    const res = await axiosInstance.put(API_ENDPOINTS.COMPANY, data);
    return res.data;
  },
};

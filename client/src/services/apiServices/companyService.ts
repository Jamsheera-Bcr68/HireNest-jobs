import axiosInstance from '../../libraries/axios';
import { type CompanyRegisterType } from '../../libraries/validations/company/companyRegisterValidator';
import { type CompanyProfileEditType } from '../../libraries/validations/company/companyEditFormValidation';
import type { ISocialLinks } from '../../types/profileTypes';
import { type CompanyUpdateFiedType } from '../../libraries/validations/company/companyUpdateFieldsValidation';

export const companyService = {
  async getCompany() {
    const res = await axiosInstance.get('/company');
    return res.data;
  },
  async uploadLogo(formData: FormData) {
    const res = await axiosInstance.patch('/company/logo', formData);
    return res.data;
  },
  async uploadDocument(formdata: FormData) {
    const data = await axiosInstance.patch(
      '/company/profle/document',
      formdata
    );
    return data;
  },
  async registerCompany(data: CompanyRegisterType) {
    console.log('from services', data);

    const res = await axiosInstance.post('/company/register', data);
    return res.data;
  },
  async changeLogo(formData: FormData) {
    const res = await axiosInstance.patch('/company/profile/logo', formData);
    return res.data;
  },
  async removeLogo() {
    const res = await axiosInstance.delete('/company/profile/logo');
    return res.data;
  },
  async editProfile(formData: CompanyProfileEditType) {
    const res = await axiosInstance.patch('/company/profile', formData);
    return res.data;
  },
  async addAbout(value: string) {
    const data = {
      about: value,
    };
    const res = await axiosInstance.patch('/company/profile/fields', data);
    return res.data;
  },
  async addVision(value: string) {
    const data = {
      vision: value,
    };
    const res = await axiosInstance.patch('/company/profile/fields', data);
    return res.data;
  },
  async addMission(value: string) {
    const data = {
      mission: value,
    };
    const res = await axiosInstance.patch('/company/profile/fields', data);
    return res.data;
  },
  async addCulture(value: string) {
    const data = {
      culture: value,
    };
    const res = await axiosInstance.patch('/company/profile/fields', data);
    return res.data;
  },
  async addLink(formData: ISocialLinks) {
    const res = await axiosInstance.patch('/company/profile/fields', {
      socialMediaLinks: formData,
    });
    return res.data;
  },
};

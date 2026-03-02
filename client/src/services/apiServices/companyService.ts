import axiosInstance from '../../libraries/axios';
import { type CompanyRegisterType } from '../../libraries/validations/company/companyRegisterValidator';

export const companyService = {
  async uploadProfileImage(formData: FormData) {
    const res = await axiosInstance.patch('/company/profile/image', formData);
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
};

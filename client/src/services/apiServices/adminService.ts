import axiosInstance from '../../libraries/axios';
import { type CompanyProfileType } from '../../types/dtos/profileTypes/userTypes';
import { ADMIN_API_ENDPOINTS } from '../../constants/apiEndPoints/admin';
import {type CompanyFilter } from '../../presentation/pages/admin/Companies';

export const adminService = {
  async logout() {
    const res = await axiosInstance.post(
      '/auth/logout',
      {},
      { withCredentials: true }
    );

    return res.data;
  },


  async getAllCompanies(filter: CompanyFilter,page:number,limit:number) {
    console.log('filter ', filter);

    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.COMPANIES, {
      params: {...filter,page,limit}
    });

    return res.data;
  },


  async getCompany(id: string) {
    const res = await axiosInstance.get(ADMIN_API_ENDPOINTS.COMPANY(id));
    return res.data;
  },


  async updateCompany(id: string, data: Partial<CompanyProfileType>) {
    console.log('data',data);
    
    const res = await axiosInstance.patch(ADMIN_API_ENDPOINTS.COMPANY(id), data);
    return res.data;
  },


  async getCompanyStatus(){
    const res=await axiosInstance.get(ADMIN_API_ENDPOINTS.COMPANY_STATUS)
    return res.data
  }
};

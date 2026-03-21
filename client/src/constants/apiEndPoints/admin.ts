export const ADMIN_API_ENDPOINTS = {
  COMPANIES: '/admin/companies',
  COMPANY: (id: string) => `/admin/companies/${id}`,
  CANDIDATE: (id: string) => `/admin/candidates/${id}`,
  COMPANY_STATUS: '/admin/company-status',
  CANDIDATES_STATUS: '/admin/candidates-status',
  CANDIDATES: '/admin/candidates',
  CHECK_EXIST_FILE: '/admin/check-fileExist',
};

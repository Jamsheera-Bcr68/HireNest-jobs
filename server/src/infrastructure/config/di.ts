import { Job } from '../../domain/entities/Job';

//*==================  usecases    ================*
//auth
import { RegisterUseCase } from '../../applications/useCases/auth/registerUserUsecases';
import { AdminGoogleAuthUsecase } from '../../applications/useCases/auth/adminGoogleAuthUsecase';
import { LoginUseCase } from '../../applications/useCases/auth/loginUserUsecase';
import { LogoutUsecase } from '../../applications/useCases/auth/logoutUsecase';
import { AdminLoginUsecase } from '../../applications/useCases/auth/adminLoginUsecase';
import { ForgotPassWordUsecase } from '../../applications/useCases/auth/forgotPasswordUsecase';
import { ResetPasswordUsecase } from '../../applications/useCases/auth/resetPasswordUsecase';
import { GoogleLoginUsecase } from '../../applications/useCases/auth/googleLoginUsecase';
import { ChangePasswordUsecase } from '../../applications/useCases/auth/ChangePasswordUsecase';

//candidate

import { CandidateProfileEditUsecase } from '../../applications/useCases/candidate/CandidateProfileEditUsecase';
import { GetUserUseCase } from '../../applications/useCases/user/GetUserUseCase';
import { EditProfileImageUseCase } from '../../applications/useCases/user/EditProfileImageUseCase';
import { RemoveProfileImageUseCase } from '../../applications/useCases/user/RemoveProfileImageUseCase';
import { EditAboutUseCase } from '../../applications/useCases/candidate/EditAboutUseCase';
import { AddSkillsToProfieUseCase } from '../../applications/useCases/candidate/AddSkillstoProfileUseCase';
import { RemoveSkillFromProfileUseCase } from '../../applications/useCases/candidate/RemoveSkillFromProfileUseCase';
import { AddExperienceUseCase } from '../../applications/useCases/candidate/AddExperienceUseCase';
import { EditExperienceUseCase } from '../../applications/useCases/candidate/EditExperienceUseCase';
import { RemoveExperienceUseCase } from '../../applications/useCases/candidate/RemoveExperienceUseCase';
import { AddEducationUseCase } from '../../applications/useCases/candidate/AddEducationUseCase';
import { GetAllEducationUseCase } from '../../applications/useCases/candidate/GetAllEducationUseCase';
import { EditEducationUseCase } from '../../applications/useCases/candidate/EditEducationUseCase';
import { RemoveEducationUseCase } from '../../applications/useCases/candidate/RemoveEducationUseCase';
import { AddResumeUseCase } from '../../applications/useCases/candidate/AddResumeUseCase';
import { RemoveResumUseCase } from '../../applications/useCases/candidate/RemoveResumeUseCase';
//skills
import { GetAllSkillsUseCase } from '../../applications/useCases/skills/GetAllSkillsUseCase';
import { CompanyRegisterUseCase } from '../../applications/useCases/company/companyRegisterUseCase';
import { AddLogoUseCase } from '../../applications/useCases/company/AddLogoUseCase';
import { AddDocumentUseCase } from '../../applications/useCases/company/AddDocumentUseCase';

import { AddSkillUseCase } from '../../applications/useCases/skills/AddSkillUseCase';
//job
import { CrateJobUseCase } from '../../applications/useCases/job/createJobUseCase';
import { GetCompanyUseCase } from '../../applications/useCases/company/GetCompanyUseCase';
import { ChangeLogoUseCase } from '../../applications/useCases/company/ChangeLogoUseCase';
import { LogoRemoveUseCase } from '../../applications/useCases/company/LogoRemoveUsecase';
import { CompanyProfileUpdate } from '../../applications/useCases/company/CompanyUpdateProfileUseCase';
import { CompanyAboutUpdateUseCase } from '../../applications/useCases/company/CompanyAboutUpdateUseCase';
//admin

import { GetCompaniesUseCase } from '../../applications/useCases/admin/GetCompaniesUseCase';
import { AdminGetCompanyUseCase } from '../../applications/useCases/admin/GetCompanyUseCase';
import { AdminUpdateCompanyUseCase } from '../../applications/useCases/admin/AdminUpdateCompanyUseCase';
import { GetCompanyStatusUseCase } from '../../applications/useCases/admin/GetCompanyStatusUseCase';
import { GetCandidateStatusUseCase } from '../../applications/useCases/admin/GetCandidatesStatus';
import { AdminGetCandidateUseCase } from '../../applications/useCases/admin/AdminGetCandidatesUseCase';
import { AdminUpdateCandidateUseCase } from '../../applications/useCases/admin/AdminUpdateCandidateUseCase';
import { AdminGetEntityUseCase } from '../../applications/useCases/admin/AdminGetCandidateUseCase';
import { GetFileExistUseCase } from '../../applications/useCases/admin/GetFileExistUseCase';
import { GetHomeDataUseCase } from '../../applications/useCases/candidate/GetHomeDataUseCase';
import { GetAllJobssUseCase } from '../../applications/useCases/candidate/GetAllJobsUseCase';
import { GetJobDetailsUseCase } from '../../applications/useCases/candidate/GetJobDetailsUseCase';
import { ReportJobUseCase } from '../../applications/useCases/candidate/report-job.usecase';
import { SaveJobUseCase } from '../../applications/useCases/candidate/save-job.usecase';
import { RemoveSavedJobUseCase } from '../../applications/useCases/candidate/unsave-job.usecase';
import { GetSavedJobUseCase } from '../../applications/useCases/candidate/get-saved-jobs.usecase';
import { GetPostSatusUseCase } from '../../applications/useCases/company/company-post-status.usecase';
import { UpdateJobStatusUseCase } from '../../applications/useCases/job/update-job-status.usecase';
import { UpdateJobUseCase } from '../../applications/useCases/job/update-job.usecase';
import { ApplyJobUseCase } from '../../applications/useCases/candidate/apply-job.usecase';
import { GetSkillSatusUseCase } from '../../applications/useCases/skills/get-skill-status.usecase';
import { UpdateSkillStatusUseCase } from '../../applications/useCases/skills/update-skill-status.usecase';
import { UpdateSkillUsecase } from '../../applications/useCases/skills/update-skill.usecase';
import { GetRequestedSkillsUseCase } from '../../applications/useCases/skills/requested-skills.usecase';
import { GetApplicationStatusUseCase } from '../../applications/useCases/applications/get-applications-status.usecase';
import { GetAllApplicationsUsecase } from '../../applications/useCases/applications/get-all-applications.usecase';
import { GetApplicationDetailUsecase } from '../../applications/useCases/applications/get-application-details.usecase';
import { GetCompanyDataUseCase } from '../../applications/useCases/company/get-company-data.usecase';
import { GetCandidateResumesUsecase } from '../../applications/useCases/candidate/get-resumes.usecase';
import { UpdateApplicationStatusUseCase } from '../../applications/useCases/applications/update-application-status.usecase';


//==Controllers
//auth

import { AuthController } from '../../presentation/http/controllers/auth/authController';
import { RefreshTokenController } from '../../presentation/http/controllers/auth/refreshTokenController';
import { AdminAuthController } from '../../presentation/http/controllers/auth/adminAuthController';
import { ForgotPassWordController } from '../../presentation/http/controllers/auth/forgotPasswordController';
import { ResetPasswordController } from '../../presentation/http/controllers/auth/resetPasswordController';
import { GoogleLoginController } from '../../presentation/http/controllers/auth/googleLoginController';
import { AdminGoogleAuthController } from '../../presentation/http/controllers/auth/AdminGoogleLoginController';
import { ChangePasswordController } from '../../presentation/http/controllers/auth/ChangePasswordController';

//candidate
import { CandidateProfileController } from '../../presentation/http/controllers/candidate/CandidateProfileController';
import { SkillsController } from '../../presentation/http/controllers/SkillsController';
import { CompanyProfileController } from '../../presentation/http/controllers/company/companyProfileController';
import { UserController } from '../../presentation/http/controllers/userController';
import { JobController } from '../../presentation/http/controllers/jobController';
import { ApplicationController } from '../../presentation/http/controllers/application.controller';
//admin
import { AdminUserController } from '../../presentation/http/controllers/admin/adminUserController';
import { AdminJobController } from '../../presentation/http/controllers/admin/admin-job.controller';
//==repsitories

import { UserRepository } from '../repositories/user/userRepository';
import { OtpRepository } from '../repositories/user/otpRepository';
import { AdminRepository } from '../repositories/admin/adminRepository';
import { SkillRepository } from '../repositories/user/SkillsRepository';
import { ExperieceRepository } from '../repositories/user/ExperienceRepository';
import { EducationRepository } from '../repositories/user/educationRepository';
import { CompanyRepository } from '../repositories/user/companyRepository';
import { JobRepository } from '../repositories/user/JobRepository';
import { ApplicationRepository } from '../repositories/application.repository';
//services

import { OtpGenerator } from '../services/otpgenerator';
import { EmailService } from '../../applications/services/emailService';
import { TokenService } from '../../applications/services/TokenService';
import { SendOtpService } from '../../applications/services/sendOtpServices';
import { VerifyOtpService } from '../../applications/services/verifyOtpService';
import { GoogleAuthService } from '../../applications/services/googleAuthService';
import { ImageStorageService } from '../services/ImageStorageService';
import { FileStorageService } from '../services/fileStorageService';

//repositories
const userRepository = new UserRepository();
const otpGenerator = new OtpGenerator();
const otpRepository = new OtpRepository();
const adminRepository = new AdminRepository();
const skillRepository = new SkillRepository();
const experienceRepository = new ExperieceRepository();
const educationRepository = new EducationRepository();
const companyRepository = new CompanyRepository();
const jobRepository = new JobRepository();
const applicationRepository = new ApplicationRepository();

const emailService = new EmailService();
const verifyOtpService = new VerifyOtpService(otpRepository, userRepository);
export const tokenService = new TokenService();
const googleAuthService = new GoogleAuthService();
const imageStorageService = new ImageStorageService();
const fileStorageServices = new FileStorageService();

const registerUseCase = new RegisterUseCase(userRepository);
const sendOtpService = new SendOtpService(
  otpGenerator,
  emailService,
  otpRepository
);
const loginUseCase = new LoginUseCase(
  userRepository,
  tokenService,
  companyRepository,
  applicationRepository
);
const adminLoginUsecase = new AdminLoginUsecase(adminRepository, tokenService);
const forgotPasswordUsecase = new ForgotPassWordUsecase(
  userRepository,
  emailService,
  adminRepository
);
const resetPasswordUsecase = new ResetPasswordUsecase(
  userRepository,
  adminRepository
);
const googleLoginUsecase = new GoogleLoginUsecase(
  userRepository,
  googleAuthService,
  tokenService,
  companyRepository,
  applicationRepository
);
const adminGoogleAuthUsecase = new AdminGoogleAuthUsecase(
  googleAuthService,
  adminRepository,
  tokenService
);
const logoutUseCase = new LogoutUsecase();
const changePasswordUsecase = new ChangePasswordUsecase(userRepository);
const removeExperienceUseCase = new RemoveExperienceUseCase(
  experienceRepository,
  userRepository
);

//candidate
const candidateEditProfileUsecase = new CandidateProfileEditUsecase(
  userRepository
);
const addSkilltoProfileUseCase = new AddSkillsToProfieUseCase(
  userRepository,
  skillRepository
);
const removeSkillFromProfileUseCase = new RemoveSkillFromProfileUseCase(
  userRepository
);
const addExperienceUseCase = new AddExperienceUseCase(
  userRepository,
  experienceRepository
);
const editExperienceUseCase = new EditExperienceUseCase(
  userRepository,
  experienceRepository
);
//user
const getUserUserCase = new GetUserUseCase(userRepository);
const editProfileImageUseCase = new EditProfileImageUseCase(
  userRepository,
  imageStorageService
);
const removeProfileImageUseCase = new RemoveProfileImageUseCase(
  userRepository,
  imageStorageService
);
const editAboutUsecase = new EditAboutUseCase(userRepository);
//education
const addEducationUseCase = new AddEducationUseCase(
  educationRepository,
  userRepository
);
const getAllEducationUseCase = new GetAllEducationUseCase(educationRepository);
const editEducationUseCase = new EditEducationUseCase(
  educationRepository,
  userRepository
);
const removeEducationUseCase = new RemoveEducationUseCase(
  educationRepository,
  userRepository
);

const addResumeUseCase = new AddResumeUseCase(
  userRepository,
  fileStorageServices
);
const removeResumeUseCase = new RemoveResumUseCase(
  userRepository,
  fileStorageServices
);
//skills
const getAllSkillsUseCase = new GetAllSkillsUseCase(
  skillRepository,
  jobRepository,
  userRepository
);
const companyRegisterUseCase = new CompanyRegisterUseCase(
  companyRepository,
  userRepository
);
const addLogoUseCase = new AddLogoUseCase(imageStorageService);
const addDocumentUseCase = new AddDocumentUseCase(fileStorageServices);
const addSkillUsecase = new AddSkillUseCase(
  skillRepository,
  adminRepository,
  companyRepository
);
//job
const createJobUseCase = new CrateJobUseCase(
  userRepository,
  jobRepository,
  companyRepository,
  skillRepository
);
const getCompanyUseCase = new GetCompanyUseCase(companyRepository);
const changeLogoUseCase = new ChangeLogoUseCase(
  companyRepository,
  imageStorageService
);
const logoRemoveUseCase = new LogoRemoveUseCase(
  companyRepository,
  imageStorageService
);
const companyProfileUpdateUseCase = new CompanyProfileUpdate(companyRepository);
const companyAboutUpdateUseCase = new CompanyAboutUpdateUseCase(
  companyRepository
);

const getCompaniesUseCase = new GetCompaniesUseCase(companyRepository);
const adminGetCompanyUseCase = new AdminGetCompanyUseCase(companyRepository);
const adminUpdateCompanyUseCase = new AdminUpdateCompanyUseCase(
  companyRepository,
  userRepository
);
const getCompnayStatusUseCase = new GetCompanyStatusUseCase(companyRepository);
const getCandidateStatusUseCase = new GetCandidateStatusUseCase(userRepository);
const adminGetCandidatesUseCase = new AdminGetCandidateUseCase(
  userRepository,
  educationRepository
);
const adminUpdateCandidateUseCase = new AdminUpdateCandidateUseCase(
  userRepository
);
const adminGetEntityUseCase = new AdminGetEntityUseCase(userRepository);
const getFileExistUseCase = new GetFileExistUseCase(fileStorageServices);
const getHomeDataUseCase = new GetHomeDataUseCase(
  jobRepository,
  userRepository,
  skillRepository
);
const getAllJobsUsecase = new GetAllJobssUseCase(
  jobRepository,
  skillRepository
);
const getJobDetailsUseCase = new GetJobDetailsUseCase(
  jobRepository,
  companyRepository,
  skillRepository,
  userRepository
);
const reportJobUseCase = new ReportJobUseCase(jobRepository);
const saveJobUseCase = new SaveJobUseCase(jobRepository, userRepository);
const removeSavedJobUseCase = new RemoveSavedJobUseCase(
  jobRepository,
  userRepository
);
const getSavedJobsUseCase = new GetSavedJobUseCase(
  jobRepository,
  skillRepository,
  userRepository
);

const getPostStatusUseCase = new GetPostSatusUseCase(
  jobRepository,
  companyRepository
);
const updateJobStatusUseCase = new UpdateJobStatusUseCase(
  jobRepository,
  companyRepository,
  skillRepository
);
const updateJobUseCase = new UpdateJobUseCase(
  jobRepository,
  userRepository,
  skillRepository
);

const applyJobUseCase = new ApplyJobUseCase(
  applicationRepository,
  userRepository,
  jobRepository
);

const getApplicationDetailsUsecase=new GetApplicationDetailUsecase(applicationRepository,jobRepository,companyRepository,userRepository,skillRepository)
const getCompanyDataUsecase=new GetCompanyDataUseCase(companyRepository)
const getCandidateResumesUsecase=new GetCandidateResumesUsecase(userRepository)






export const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  sendOtpService,
  verifyOtpService,
  logoutUseCase
);
export const getSkillStatusUseCase = new GetSkillSatusUseCase(
  skillRepository,
  companyRepository,
  adminRepository
);

export const updateSkillStatusUsecase = new UpdateSkillStatusUseCase(
  skillRepository,
  adminRepository
);
const updateSkillUseCase = new UpdateSkillUsecase(
  skillRepository,
  adminRepository
);
export const requestedSkillUsecase = new GetRequestedSkillsUseCase(
  skillRepository,
  jobRepository,
  userRepository
);

const getApplicationStatusUseCase=new GetApplicationStatusUseCase(applicationRepository)
const getAllApplications=new GetAllApplicationsUsecase(applicationRepository,jobRepository,companyRepository)
const updateApplicationStatusUsecase=new UpdateApplicationStatusUseCase(applicationRepository)




export const refreshController = new RefreshTokenController(tokenService);
export const adminAuthController = new AdminAuthController(adminLoginUsecase);
export const forgotPasswordController = new ForgotPassWordController(
  forgotPasswordUsecase
);
export const resetPasswordController = new ResetPasswordController(
  resetPasswordUsecase
);
export const googleLoginController = new GoogleLoginController(
  googleLoginUsecase
);
export const adminGoogleAuthController = new AdminGoogleAuthController(
  adminGoogleAuthUsecase
);

export const changePasswordController = new ChangePasswordController(
  changePasswordUsecase
);

export const candidateProfileController = new CandidateProfileController(
  candidateEditProfileUsecase,
  getUserUserCase,
  editProfileImageUseCase,
  removeProfileImageUseCase,
  editAboutUsecase,
  addSkilltoProfileUseCase,
  removeSkillFromProfileUseCase,
  addExperienceUseCase,
  editExperienceUseCase,
  removeExperienceUseCase,
  addEducationUseCase,
  editEducationUseCase,
  removeEducationUseCase,
  addResumeUseCase,
  removeResumeUseCase,getCandidateResumesUsecase
);

export const skillController = new SkillsController(
  getAllSkillsUseCase,
  addSkillUsecase,
  getSkillStatusUseCase,
  updateSkillStatusUsecase,
  updateSkillUseCase,
  requestedSkillUsecase
);
export const companyProfileController = new CompanyProfileController(
  companyRegisterUseCase,
  addLogoUseCase,
  addDocumentUseCase,
  getCompanyUseCase,
  changeLogoUseCase,
  logoRemoveUseCase,
  companyProfileUpdateUseCase,
  companyAboutUpdateUseCase
);
export const jobController = new JobController(
  createJobUseCase,
  getAllJobsUsecase,
  getJobDetailsUseCase,
  reportJobUseCase,
  saveJobUseCase,
  removeSavedJobUseCase,
  getSavedJobsUseCase,
  getPostStatusUseCase,
  updateJobStatusUseCase,
  updateJobUseCase
);
export const adminUserController = new AdminUserController(
  getCompaniesUseCase,
  adminGetCompanyUseCase,
  adminUpdateCompanyUseCase,
  getCompnayStatusUseCase,
  getCandidateStatusUseCase,
  adminGetCandidatesUseCase,
  adminUpdateCandidateUseCase,
  adminGetEntityUseCase,
  getFileExistUseCase
);
export const adminJobcontroller = new AdminJobController(
  updateJobStatusUseCase,
  getPostStatusUseCase,
  getAllJobsUsecase,
  getJobDetailsUseCase
);
export const userControlller = new UserController(getHomeDataUseCase,getCompanyDataUsecase);

export const applicationController = new ApplicationController(applyJobUseCase,getApplicationStatusUseCase,getAllApplications,getApplicationDetailsUsecase,updateApplicationStatusUsecase);

//*==================  usecases    ================*
//auth
import { RegisterUseCase } from '../../applications/useCases/auth/register-user.usecases';
import { AdminGoogleAuthUsecase } from '../../applications/useCases/auth/admin-google-auth.usecase';
import { LoginUseCase } from '../../applications/useCases/auth/login-user.usecase';
import { LogoutUsecase } from '../../applications/useCases/auth/logout.usecase';
import { AdminLoginUsecase } from '../../applications/useCases/auth/admin-login.usecase';
import { ForgotPassWordUsecase } from '../../applications/useCases/auth/forgot-password.usecase';
import { ResetPasswordUsecase } from '../../applications/useCases/auth/reset-password.usecase';
import { GoogleLoginUsecase } from '../../applications/useCases/auth/google-login.usecase';
import { ChangePasswordUsecase } from '../../applications/useCases/auth/change-password.usecase';

//candidate

import { CandidateProfileEditUsecase } from '../../applications/useCases/candidate/update-candidate-profile.usecase';
import { GetUserUseCase } from '../../applications/useCases/user/get-user.usecase';
import { EditProfileImageUseCase } from '../../applications/useCases/user/update-profile-image.usecase';
import { RemoveProfileImageUseCase } from '../../applications/useCases/user/remove-profile-image.usecase';
import { EditAboutUseCase } from '../../applications/useCases/candidate/update-about.usecase';
import { AddSkillsToProfieUseCase } from '../../applications/useCases/candidate/add-profile-skill.usecase';
import { RemoveSkillFromProfileUseCase } from '../../applications/useCases/candidate/remove-profile-skill.usecase';
import { AddExperienceUseCase } from '../../applications/useCases/candidate/add-experience.usecase';
import { EditExperienceUseCase } from '../../applications/useCases/candidate/update-experience.usecase';
import { RemoveExperienceUseCase } from '../../applications/useCases/candidate/remove-experience.usecase';
import { AddEducationUseCase } from '../../applications/useCases/candidate/add-education.usecase';
import { GetAllEducationUseCase } from '../../applications/useCases/candidate/get-educations.usecase';
import { EditEducationUseCase } from '../../applications/useCases/candidate/update-education.usecase';
import { RemoveEducationUseCase } from '../../applications/useCases/candidate/remove-education.usecase';
import { AddResumeUseCase } from '../../applications/useCases/candidate/add-resume.usecase';
import { RemoveResumUseCase } from '../../applications/useCases/candidate/remove-resume.usecase';
//skills
import { GetAllSkillsUseCase } from '../../applications/useCases/skills/get-skills.usecase';
import { CompanyRegisterUseCase } from '../../applications/useCases/company/company-register.usecase';
import { AddLogoUseCase } from '../../applications/useCases/company/add-logo.usecase';
import { AddDocumentUseCase } from '../../applications/useCases/company/add-document.usecase';

import { AddSkillUseCase } from '../../applications/useCases/skills/add-skill.usecase';
//job
import { CrateJobUseCase } from '../../applications/useCases/job/create-job.usecase';
import { GetCompanyUseCase } from '../../applications/useCases/company/get-company.usecase';
import { ChangeLogoUseCase } from '../../applications/useCases/company/update-logo.usecase';
import { LogoRemoveUseCase } from '../../applications/useCases/company/remove-logo.usecase';
import { CompanyProfileUpdate } from '../../applications/useCases/company/company-update-profile.usecase';
import { CompanyAboutUpdateUseCase } from '../../applications/useCases/company/company-update-about.usecase';
//admin

import { GetCompaniesUseCase } from '../../applications/useCases/admin/get-companies.usecase';
import { AdminGetCompanyUseCase } from '../../applications/useCases/admin/get-company-usecase';
import { AdminUpdateCompanyUseCase } from '../../applications/useCases/admin/admin-update-company.usecase';
import { GetCompanyStatusUseCase } from '../../applications/useCases/admin/get-company-status.usecase';
import { GetCandidateStatusUseCase } from '../../applications/useCases/admin/get-candidate-status.usecase';
import { AdminGetCandidateUseCase } from '../../applications/useCases/admin/admin-get-candidates.usecase';
import { AdminUpdateCandidateUseCase } from '../../applications/useCases/admin/admin-update-candidate.usecase';
import { AdminGetEntityUseCase } from '../../applications/useCases/admin/admin-get-candidate.usecase';
import { GetFileExistUseCase } from '../../applications/useCases/admin/file-exist.usecase';
import { GetHomeDataUseCase } from '../../applications/useCases/candidate/get-homedata.usecase';
import { GetAllJobssUseCase } from '../../applications/useCases/candidate/get-jobs.usecase';
import { GetJobDetailsUseCase } from '../../applications/useCases/candidate/get-job.usecase';
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
import { ScheduleInterviewUsecase } from '../../applications/useCases/interviews/schedule-interveiw.usecase';
import { GetInterviewStatusUseCase } from '../../applications/useCases/interviews/get-interview-status.usecase';
import { GetInterviewsUsecase } from '../../applications/useCases/interviews/get-interviews.usecase';
import { UpdateInterviewStatusUsecase } from '../../applications/useCases/interviews/update-interview-status.usecase';
import { GetInterviewDetailsUsecase } from '../../applications/useCases/interviews/get-interview.usecase';
import { UpdateInterviewUsecase } from '../../applications/useCases/interviews/update-interview.usecase';
import { UpdateInterviewResultUsecase } from '../../applications/useCases/interviews/update-result.usecase';
import { ConfirmInterviewUsecase } from '../../applications/useCases/interviews/confirm-interview.usecase';
import { RescheduleRequestUsecase } from '../../applications/useCases/interviews/reschedule-request.usecase';
import { GetNewNotificationCountUsecase } from '../../applications/useCases/notifications/get-count.usecase';
import { GetNotificationsUsecase } from '../../applications/useCases/notifications/get-notifications.usecase';
import { MarkAsReadUsecase } from '../../applications/useCases/notifications/mark-as-read.usecase';
import { MarkAllNotificationsAsReadUsecase } from '../../applications/useCases/notifications/mark-all-as-read.usecase';
import { DeleteNotificationUsecase } from '../../applications/useCases/notifications/delete-notification.usecase';
import { ReApplyCompanyUsecase } from '../../applications/useCases/company/reapply-company.usecase';
//==Controllers
//auth

import { AuthController } from '../../presentation/http/controllers/auth/auth.controller';
import { RefreshTokenController } from '../../presentation/http/controllers/auth/refresh-token.controller';
import { AdminAuthController } from '../../presentation/http/controllers/auth/admin-auth.controller';
import { ForgotPassWordController } from '../../presentation/http/controllers/auth/forgot-password.controller';
import { ResetPasswordController } from '../../presentation/http/controllers/auth/reset-password.controller';
import { GoogleLoginController } from '../../presentation/http/controllers/auth/google-login.controller';
import { AdminGoogleAuthController } from '../../presentation/http/controllers/auth/admin-google-login.controller';
import { ChangePasswordController } from '../../presentation/http/controllers/auth/change-password.controller';
import { NotificationControlller } from '../../presentation/http/controllers/notification.controller';
//candidate
import { CandidateProfileController } from '../../presentation/http/controllers/candidate-profile.controller';
import { SkillsController } from '../../presentation/http/controllers/skills.controller';
import { CompanyProfileController } from '../../presentation/http/controllers/company-profile.controller';
import { UserController } from '../../presentation/http/controllers/user.controller';
import { JobController } from '../../presentation/http/controllers/job.controller';
import { ApplicationController } from '../../presentation/http/controllers/application.controller';
import { InterviewController } from '../../presentation/http/controllers/interview.controller';
import { AdminUserController } from '../../presentation/http/controllers/admin/admin-user.controller';
import { AdminJobController } from '../../presentation/http/controllers/admin/admin-job.controller';
//==repsitories

import { UserRepository } from '../repositories/user.repository';
import { OtpRepository } from '../repositories/otp.repository';
import { AdminRepository } from '../repositories/admin.repository';
import { SkillRepository } from '../repositories/skills.repository';
import { ExperieceRepository } from '../repositories/experience.repository';
import { EducationRepository } from '../repositories/education.repository';
import { CompanyRepository } from '../repositories/company.repository';
import { JobRepository } from '../repositories/job.repository';
import { ApplicationRepository } from '../repositories/application.repository';
import { InterviewRepository } from '../repositories/interview.repository';
import { NotificationRepository } from '../repositories/notification.repository';
//services

import { OtpGenerator } from '../services/otp-generator.service';
import { EmailService } from '../../applications/services/email.service';
import { TokenService } from '../../applications/services/token.service';
import { SendOtpService } from '../../applications/services/send-otp.services';
import { VerifyOtpService } from '../../applications/services/verify-otp.service';
import { GoogleAuthService } from '../../applications/services/google-auth.service';
import { ImageStorageService } from '../services/image-storage.service';
import { FileStorageService } from '../services/file-storage.service';
import { NotificationService } from '../../applications/services/notification.service';

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
const interviewRepository = new InterviewRepository();
const notificationRepository = new NotificationRepository();

const emailService = new EmailService();
const verifyOtpService = new VerifyOtpService(otpRepository, userRepository);
export const tokenService = new TokenService();
const googleAuthService = new GoogleAuthService();
const imageStorageService = new ImageStorageService();
const fileStorageServices = new FileStorageService();
const notificatinService = new NotificationService(notificationRepository);

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
const getUserUserCase = new GetUserUseCase(userRepository,companyRepository);
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
  userRepository,adminRepository,notificatinService
);
const addLogoUseCase = new AddLogoUseCase(imageStorageService);
const addDocumentUseCase = new AddDocumentUseCase(fileStorageServices);
const addSkillUsecase = new AddSkillUseCase(
  skillRepository,
  adminRepository,
  companyRepository,
  notificatinService
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
  userRepository,notificatinService)
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
  jobRepository,
  notificatinService
);

const getApplicationDetailsUsecase = new GetApplicationDetailUsecase(
  applicationRepository,
  jobRepository,
  companyRepository,
  userRepository,
  skillRepository
);
const getCompanyDataUsecase = new GetCompanyDataUseCase(companyRepository);
const getCandidateResumesUsecase = new GetCandidateResumesUsecase(
  userRepository
);
const scheduleInterviewUsecase = new ScheduleInterviewUsecase(
  applicationRepository,
  interviewRepository,
  notificatinService,
  companyRepository,
  jobRepository
);
const getInterviewStatusUsecase = new GetInterviewStatusUseCase(
  interviewRepository,
  companyRepository
);
const updateInterviewStatusUsecase = new UpdateInterviewStatusUsecase(
  interviewRepository,
  companyRepository
);

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

const getApplicationStatusUseCase = new GetApplicationStatusUseCase(
  applicationRepository,
  companyRepository
);
const getAllApplications = new GetAllApplicationsUsecase(
  applicationRepository,
  jobRepository,
  companyRepository
);
const updateApplicationStatusUsecase = new UpdateApplicationStatusUseCase(
  applicationRepository,
  companyRepository,
  jobRepository,
  notificatinService
);
const getInterviewsUsecase = new GetInterviewsUsecase(
  interviewRepository,
  companyRepository,
  userRepository
);
const getInterviewDetailsUsecase = new GetInterviewDetailsUsecase(
  interviewRepository,
  jobRepository,
  companyRepository,
  userRepository
);
const updateInterviewUsecase = new UpdateInterviewUsecase(
  interviewRepository,
  companyRepository,

  jobRepository,
  userRepository
);
const upateInterviewResultUsecase = new UpdateInterviewResultUsecase(
  interviewRepository,
  companyRepository
);

const confirmInterviewUsecase = new ConfirmInterviewUsecase(
  interviewRepository,
  notificatinService,
  jobRepository,
  userRepository
);
const rescheduleInterviewUsecase = new RescheduleRequestUsecase(
  interviewRepository
);

const getNewNotificationCountUsecase = new GetNewNotificationCountUsecase(
  notificationRepository,
  companyRepository
);
const getNotificationsUsecase = new GetNotificationsUsecase(
  notificationRepository,
  companyRepository
);
const markAsReadUsecase = new MarkAsReadUsecase(
  notificationRepository,
  companyRepository
);
const markAllAsReadUsecase = new MarkAllNotificationsAsReadUsecase(
  notificationRepository
);
const deleteNotificationUsecase = new DeleteNotificationUsecase(
  notificationRepository,
  companyRepository
);
const reapplyUsecase=new ReApplyCompanyUsecase(companyRepository,adminRepository,notificatinService)

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
  removeResumeUseCase,
  getCandidateResumesUsecase
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
export const userControlller = new UserController(
  getHomeDataUseCase,
  getCompanyDataUsecase, reapplyUsecase
);

export const applicationController = new ApplicationController(
  applyJobUseCase,
  getApplicationStatusUseCase,
  getAllApplications,
  getApplicationDetailsUsecase,
  updateApplicationStatusUsecase
);
export const interviewcontroller = new InterviewController(
  scheduleInterviewUsecase,
  updateApplicationStatusUsecase,
  getInterviewStatusUsecase,
  getInterviewsUsecase,
  updateInterviewStatusUsecase,
  getInterviewDetailsUsecase,
  updateInterviewUsecase,
  upateInterviewResultUsecase,
  confirmInterviewUsecase,
  rescheduleInterviewUsecase
);

export const notificationController = new NotificationControlller(
  getNewNotificationCountUsecase,
  getNotificationsUsecase,
  markAsReadUsecase,
  markAllAsReadUsecase,
  deleteNotificationUsecase
);

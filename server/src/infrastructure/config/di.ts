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
//==repsitories

import { UserRepository } from '../repositories/user/userRepository';
import { OtpRepository } from '../repositories/user/otpRepository';
import { AdminRepository } from '../repositories/admin/adminRepository';
import { SkillRepository } from '../repositories/user/SkillsRepository';
import { ExperieceRepository } from '../repositories/user/ExperienceRepository';
import { EducationRepository } from '../repositories/user/educationRepository';
import { CompanyRepository } from '../repositories/user/companyRepository';
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
const loginUseCase = new LoginUseCase(userRepository, tokenService);
const adminLoginUsecase = new AdminLoginUsecase(adminRepository, tokenService);
const forgotPasswordUsecase = new ForgotPassWordUsecase(
  userRepository,
  emailService
);
const resetPasswordUsecase = new ResetPasswordUsecase(userRepository);
const googleLoginUsecase = new GoogleLoginUsecase(
  userRepository,
  googleAuthService,
  tokenService
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
const getAllSkillsUseCase = new GetAllSkillsUseCase(skillRepository);
const companyRegisterUseCase = new CompanyRegisterUseCase(
  companyRepository,
  userRepository
);
const addLogoUseCase = new AddLogoUseCase(imageStorageService);
const addDocumentUseCase = new AddDocumentUseCase(fileStorageServices);

export const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  sendOtpService,
  verifyOtpService,
  logoutUseCase
);
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
  removeResumeUseCase
);

export const skillController = new SkillsController(getAllSkillsUseCase);
export const companyProfileController = new CompanyProfileController(
  companyRegisterUseCase,
  addLogoUseCase,
  addDocumentUseCase
);

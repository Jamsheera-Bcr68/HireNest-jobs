import express from 'express'
import { authValidator } from '../middleweres/authValidator'
import { tokenService ,adminCompanyController} from '../../../infrastructure/config/di'
const router=express.Router()


router.get('/companies',authValidator(tokenService),adminCompanyController.getAllCompanies)
router.get('/companies/:id',authValidator(tokenService),adminCompanyController.getCompany)
router.patch('/companies/:id',authValidator(tokenService),adminCompanyController.updateCompany)
  router.get("/company-status" ,authValidator(tokenService),adminCompanyController.getCompanyStatus) 


export default router
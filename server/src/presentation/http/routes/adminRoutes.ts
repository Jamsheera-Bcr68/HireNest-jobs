import express from 'express'
import { authValidator } from '../middleweres/authValidator'
import { tokenService ,adminCompanyController} from '../../../infrastructure/config/di'
const router=express.Router()


router.get('/companies',authValidator(tokenService),adminCompanyController.getAllCompanies)
    


export default router
import express, { Router } from 'express'
import { interviewcontroller } from '../../../infrastructure/config/di'


const router=express.Router()
import { interviewValidator } from '../middleweres/validatores/company/interview.validate'
import { authValidator } from '../middleweres/authValidator'
import { tokenService } from '../../../infrastructure/config/di'
import { API_END_POINTS } from './api-end-points/api-end.points'

router.post(API_END_POINTS.INTERVIEWS,authValidator(tokenService),interviewValidator,interviewcontroller.scheduleInterview)

export default router
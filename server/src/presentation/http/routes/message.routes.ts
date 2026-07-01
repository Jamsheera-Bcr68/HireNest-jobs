import express from 'express'
const router=express.Router()
import { API_END_POINTS } from './api-end-points/api-end.points'
import { chatroomController, messageController, tokenService } from '../../../infrastructure/config/di'
import { authValidator } from '../middleweres/auth-validator'


router.get(API_END_POINTS.UNREAD_MESSAGE_COUNT,authValidator(tokenService),messageController.getUnreadMessageCount)
export default router
import express from 'express'
import { authValidator } from '../middleweres/auth-validator'
import { tokenService } from '../../../infrastructure/config/di'
import { API_END_POINTS } from './api-end-points/api-end.points'
import { notificationController } from '../../../infrastructure/config/di'
const router=express.Router()

router.get(API_END_POINTS.GET_NOT_READ_COUNT,authValidator(tokenService),notificationController.getCount)

router.get(API_END_POINTS.NOTIFICATIONS,authValidator(tokenService),notificationController.getNotifications)

router.patch(API_END_POINTS.NOTIFICATION,authValidator(tokenService),notificationController.markAsRead)
router.delete(API_END_POINTS.NOTIFICATION,authValidator(tokenService),notificationController.deleteNotification)
router.patch(API_END_POINTS.NOTIFICATIONS,authValidator(tokenService),notificationController.markAllAsRead)
export default router
import express from 'express';
import { authValidator } from '../middleweres/auth-validator';
import { chatroomController } from '../../../infrastructure/config/di';
import { tokenService } from '../../../infrastructure/config/di';
import { API_END_POINTS } from './api-end-points/api-end.points';
const router = express.Router();

router.get(API_END_POINTS.CHATROOMS, authValidator(tokenService), chatroomController.getChatrooms);
router.get(API_END_POINTS.CHATROOM_MESSAGES, authValidator(tokenService), chatroomController.getChatroomMessages);
router.post(API_END_POINTS.CHATROOM_MESSAGES, authValidator(tokenService), chatroomController.sendMessage);

export default router;

import { Router } from 'express';
import authRoutes from './auth.routes';
import candidateRoutes from './candidate.routes';
import skillRoutes from './skill.routes';
import companyRoutes from './company.routes';
import jobRoutes from './job.routes';
import adminRoutes from './admin.routes';
import applicationRoutes from './application.routes';
import interviewRoutes from './interview.routes';
import notificationRoutes from './notification.routes';
import chatroomRoutes from './chat.routes';
import messageRouter from './message.routes';

const router = Router();


router.use('/auth', authRoutes);
router.use('/candidate', candidateRoutes);
router.use('/company', companyRoutes);
router.use('/skills', skillRoutes);
router.use('/jobs', jobRoutes);
router.use('/admin', adminRoutes);
router.use('/applications', applicationRoutes);
router.use('/interviews', interviewRoutes);
router.use('/notifications', notificationRoutes);
router.use('/chatrooms', chatroomRoutes);
router.use('/messages', messageRouter);

export default router;

import { Router } from 'express';
import authRoutes from './auth.routes';
import candidateRoutes from './candidate.routes';
import skillRoutes from './skill.routes';
import companyRoutes from './company.routes';
import jobRoutes from './job.routes';
import adminRoutes from './admin.routes';
import applicationRoutes from './application.routes';
import interviewRoutes from './interview.routes';
import notificationRoutes from'./notification.routes'

const router = Router();
console.log('from auth routes');

router.use('/auth', authRoutes);
router.use('/candidate', candidateRoutes);
router.use('/company', companyRoutes);
router.use('/skills', skillRoutes);
router.use('/jobs', jobRoutes);
router.use('/admin', adminRoutes);
router.use('/applications', applicationRoutes);
router.use('/interviews', interviewRoutes);
router.use('/notifications',notificationRoutes)

export default router;

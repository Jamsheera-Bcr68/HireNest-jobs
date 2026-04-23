import { Router } from 'express';
import authRoutes from './authRoutes';
import candidateRoutes from './candidateRoutes';
import skillRoutes from './skillRoutes';
import companyRoutes from './companyRoutes';
import jobRoutes from './jobRoutes';
import adminRoutes from './adminRoutes';
import applicationRoutes from './applicationRoutes';
import interviewRoutes from './interview.routes'

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

export default router;

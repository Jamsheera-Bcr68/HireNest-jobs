import { Router } from 'express';
import authRoutes from './authRoutes';
import candidateRoutes from './candidateRoutes';
import skillRoutes from './skillRoutes';
import companyRoutes from './companyRoutes';
import jobRoutes from './jobRoutes';
import adminRoutes from './adminRoutes'

const router = Router();
console.log('from auth routes');

router.use('/auth', authRoutes);
router.use('/candidate', candidateRoutes);
router.use('/company', companyRoutes);
router.use('/skills', skillRoutes);
router.use('/jobs', jobRoutes);
router.use('/admin',adminRoutes)

export default router;

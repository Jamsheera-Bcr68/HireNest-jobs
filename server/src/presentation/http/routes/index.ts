import { Router } from 'express';
import authRoutes from './authRoutes';
import candidateRoutes from './candidateRoutes';
import skillRoutes from './skillRoutes';
import companyRoutes from './companyRoutes';

const router = Router();
console.log('from auth routes');

router.use('/auth', authRoutes);
router.use('/candidate', candidateRoutes);
router.use('/skills', skillRoutes);
router.use('/company', companyRoutes);

export default router;

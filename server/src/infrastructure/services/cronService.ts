import cron from 'node-cron';
import { jobModel } from '../database/models/jobModel';

cron.schedule('0 0 * * *', async () => {
  console.log('Running job expiry checker...');

  try {
    await jobModel.updateMany(
      {
        status: 'active',
        lastDate: { $lt: new Date() },
      },
      {
        status: 'expired',
      }
    );
  } catch (error) {
    console.error('Error expiring jobs:', error);
  }
});

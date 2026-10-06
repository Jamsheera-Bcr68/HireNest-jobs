import dotenv from 'dotenv';

dotenv.config();
//console.log('from dotenv');

export const env = {
  Port: Number(process.env.PORT),
  MONGO_URL: String(process.env.MONGO_URI),
  FRONTEND_URL: process.env.FRONTEND_URL,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
  S3_BASE_URL:process.env.S3_BASE_URL
};

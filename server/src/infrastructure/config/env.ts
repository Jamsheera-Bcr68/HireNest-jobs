import dotenv from 'dotenv';

dotenv.config();
console.log('from dotenv');

export const env = {
  Port: Number(process.env.PORT),
  MONGO_URL: String(process.env.MONGO_URI),
};

import mongoose from 'mongoose';
import { env } from '../config/env';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL as string);
    console.log('db connected :', mongoose.connection.name);
  } catch (err) {
    console.error(' MongoDB connection failed', err);
    process.exit(1);
  }
};

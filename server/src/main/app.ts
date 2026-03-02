import '../types';
import express from 'express';
import routes from '../presentation/http/routes/index';
import { connectDB } from '../infrastructure/database';
import { env } from '../infrastructure/config/env';
import cors from 'cors';
import { errorHandler } from '../presentation/http/middleweres/errorHandler';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
//middleweres
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'public', 'uploads'))
);

connectDB();

app.use((req, res, next) => {
  console.log('from server');
  next();
});

app.get('/', (req, res) => {
  console.log('env', env);

  res.send('I am from your new project');
});
app.use('/', routes);
app.use(errorHandler);
export default app;

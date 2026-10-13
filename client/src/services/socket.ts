import { io } from 'socket.io-client';
import { env } from '../config/env';

export const socket = io(env.backendUrl, {
  withCredentials: true,
  autoConnect: false,
  auth: {
    token: localStorage.getItem('accessToken'),
  },
});

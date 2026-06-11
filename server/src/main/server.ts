import { env } from '../infrastructure/config/env';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setIo } from '../infrastructure/socket';

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: env.FRONTEND_URL, credentials: true },
});

setIo(io);

io.on('connection', (socket) => {
  console.log('User connected,id:', socket.id);

  io.on('join', (userId: string) => {
    socket.join(userId);
    console.log(`${userId} joined the room`);
  });

  socket.on('disconnect', () => {
    console.log('sokent disconnected');
  });
});
httpServer.listen(env.Port, () => {
  console.log('server is listening');
});

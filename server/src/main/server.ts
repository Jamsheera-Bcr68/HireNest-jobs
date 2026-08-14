import { env } from '../infrastructure/config/env';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setIo } from '../infrastructure/socket';
import { socketAuthMiddlewere } from '../presentation/socket/middleweres/socket-auth.middlewere';
import {
  markAsChatroomMessagesRead,
  presenceService,
} from '../infrastructure/config/di';
import { MarkAsReadUsecase } from '../applications/useCases/notifications/mark-as-read.usecase';
import {} from '../infrastructure/config/di';
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: env.FRONTEND_URL, credentials: true },
});

setIo(io);
io.use(socketAuthMiddlewere);

const activeParticipants = new Map<
  string,
  { userId: string; socketId: string }
>();
io.on('connection', (socket) => {
  // console.log('User connected,id:', socket.id);

  console.log('room contains', io.sockets.adapter.rooms);
  const userId: string = socket.data.user.userId;
  socket.join(userId);
  console.log(`${userId} joined the room`);
  presenceService.setOnline(userId);

  socket.on('mark_as_read', async ({ chatroomId }) => {
    const upDatedhatroomId = await markAsChatroomMessagesRead.execute(
      chatroomId,
      userId
    );
  });

  socket.on('join-meeting', ({ meetId }) => {
    console.log('join mmeeting called', meetId);
    const key = `${meetId}:${userId}`;

    socket.join(meetId);

    console.log('Join meeting event');
    console.log('Socket ID:', socket.id);
    console.log('Key:', key);
    console.log('Map size:', activeParticipants.size);
    console.log('Map contents:', [...activeParticipants.entries()]);
    const existing = activeParticipants.get(key);
    console.log('Existing:', existing);

    if (existing && existing.socketId !== socket.id) {
      console.log('this user is already in the room');

      const oldSocket = io.sockets.sockets.get(existing.socketId);
      if (oldSocket) {
        console.log('disconnecting old socket,emitting duplicate-session');
        oldSocket.emit('duplicate-session');
        setTimeout(() => {
          oldSocket.disconnect(true);
        }, 100);
      }
    }
    activeParticipants.set(key, { userId, socketId: socket.id });

    const room = io.sockets.adapter.rooms.get(meetId);

    console.log('room size ', room?.size);

    console.log(`${socket.id} joined ${meetId} userid is ${userId}`);
    if (room && room.size == 2)
      io.to(meetId).emit('participant-joined', { userId });
  });

  socket.on('offer', ({ meetId, offer }) => {
    // console.log('offer lisner',offer);

    socket.to(meetId).emit('offer', { offer });
  });

  socket.on('ice-candidate', ({ meetId, candidate }) => {
    socket.to(meetId).emit('ice-candidate', { candidate });
  });

  socket.on('answer', ({ meetId, answer }) => {
    socket.to(meetId).emit('answer', { answer });
  });

  socket.on('end-call', ({ meetId }) => {
    console.log(' listened to endcall');

    socket.to(meetId).emit('call-ended ');
  });

  socket.on('camera-state', ({ meetId, enabled }) => {
    console.log('from camera state,enabled', enabled);
    socket.to(meetId).emit('camera-state',{enabled:enabled})
  });

  socket.on('mic-state', ({ meetId, enabled }) => {
    console.log('from mic state,enabled', enabled);
    socket.to(meetId).emit('mic-state',{enabled:enabled})
  });

  socket.on('disconnect', () => {
    console.log('soket disconnected', userId);

    for (const [key, participant] of activeParticipants) {
      if (participant.socketId === socket.id) {
        activeParticipants.delete(key);
        break;
      }
    }

    presenceService.setOffline(userId);
  });
});
httpServer.listen(env.Port, () => {
  console.log('server is listening');
});

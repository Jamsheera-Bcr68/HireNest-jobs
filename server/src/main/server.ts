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

io.on('connection', (socket) => {
  console.log('User connected,id:', socket.id);

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
    console.log('join mmeeting called',meetId);
    
    socket.join(meetId);
   
    
    console.log(`${socket.id} joined ${meetId} userid is ${userId}`);
    socket.to(meetId).emit('participant-joined', { userId });

  });

  socket.on('offer',({meetId,offer})=>{
    console.log('offer lisner',offer);
    
    socket.to(meetId).emit("offer",{offer})
  })

  socket.on('disconnect', () => {
    presenceService.setOffline(userId);
    console.log('soket disconnected', userId);
  });
});
httpServer.listen(env.Port, () => {
  console.log('server is listening');
});

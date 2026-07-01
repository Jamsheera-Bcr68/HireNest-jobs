import './App.css';
import { socket } from '../services/socket.ts';
import { AppRoutes } from '../routes/index.tsx';
import { useEffect } from 'react';
import { type RootState } from '../redux/store.ts';

import { addNotification } from '../redux/slices/notification.slice.ts';
import { useSelector, useDispatch } from 'react-redux';
import { handleRefreshTokenApi } from '../libraries/axios.ts';
import { addChatroom, addMessage } from '../redux/slices/chatroom.slice.ts';

function App() {
  const { chatrooms, activeChatroomId } = useSelector(
    (state: RootState) => state.chatroom
  );
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  useEffect(() => {
    if (token && !socket.connected) {
      socket.auth = { token };
      socket.connect();
    }
    socket.on('connect', () => {
      console.log('front end connected', socket.id);
    });
    socket.on('connect_error', async (err) => {
      console.log('connect errror');
      console.log(err);

      if (err.message == 'Unauthorized') {
        const newAccessToken = await handleRefreshTokenApi();
        socket.auth = { token: newAccessToken };
        socket.connect();
      }
    });

    socket.on('disconnect', () => {
      console.log(' frondend socket disconnected');
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, [token]);

  useEffect(() => {
    console.log('chat rooms in redux', chatrooms);

    socket.on('notification', (notification) => {
      console.log('notification recieved', notification);

      dispatch(addNotification(notification));
    });
    socket.on('message', (data) => {
      console.log('message recieved', data);


      const updatedChatroom = data.updatedChatroom;

      console.log(
        'updated chatroom,active chatId',
        activeChatroomId,
        updatedChatroom
      );

      const message = data.msg;
      if (updatedChatroom.id === activeChatroomId) {
        console.log(
          `the chatroom is active now,active chatId is`,
          activeChatroomId
        );

        // updatedChatroom={...updatedChatroom,isRead:true}
        dispatch(addMessage(message));
        socket.emit('mark_as_read', { chatroomId:activeChatroomId });
      }
      dispatch(addChatroom(updatedChatroom));
    });
    return () => {
      socket.off('notification');
      socket.off('message');
    };
  }, [dispatch, activeChatroomId]);
  return <AppRoutes />;
}

export default App;

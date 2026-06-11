import './App.css';
import { socket } from '../services/socket.ts';
import { AppRoutes } from '../routes/index.tsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { StateType } from '../constants/types/user.ts';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/slices/notification.slice.ts';

function App() {
  const user = useSelector((state: StateType) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('front end connected', socket.id);
    });
    socket.on('disconnect', () => {
      console.log(' frondend socket disconnected');
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit('join', user.id);
    }
  }, [user]);

  useEffect(() => {
    socket.on('notification', (notification) => {
      console.log('notification recieved');

      dispatch(addNotification(notification));
    });
    return () => {
      socket.off('notification');
    };
  }, [dispatch]);
  return <AppRoutes />;
}

export default App;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import notificationReducer from './slices/notification.slice';
import chatroomReducer from './slices/chatroom.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    chatroom: chatroomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import notificationReducer from './slices/notification.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
});

export type RootState =ReturnType<typeof store.getState>

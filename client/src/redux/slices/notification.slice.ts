import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type NotificationType } from '../../types/notification.type';

export interface NotificationStateType {
  notifications: NotificationType[];
}
const initialState: NotificationStateType = {
  notifications: [],
};
export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NotificationType>) {
      state.notifications.unshift(action.payload);
    },

    setNotifications(state, action: PayloadAction<NotificationType[]>) {
       
        
      state.notifications = action.payload;
       console.log('from setnotifications,state',state);
    },
  },
});

export default notificationSlice.reducer;
export const { addNotification, setNotifications } = notificationSlice.actions;

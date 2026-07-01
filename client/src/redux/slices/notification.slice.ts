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
      //  console.log('from add notification,action,',action);

      state.notifications = [action.payload, ...state.notifications];
      // console.log('after addng new one notificaitons,',state.notifications);
    },

    setNotifications(state, action: PayloadAction<NotificationType[]>) {
      state.notifications = action.payload;
      //console.log('from setnotifications,state',state);
    },
  },
});

export default notificationSlice.reducer;
export const { addNotification, setNotifications } = notificationSlice.actions;

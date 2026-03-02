import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../constants/types/user';
import { type userDto } from '../types/dtos/profileTypes/userTypes';

const savedUser = localStorage.getItem('user');
const token = localStorage.getItem('accessToken');
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  accessToken: token ? token : '',
  isAuthenticated: token ? true : false,
};
export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: userDto; accessToken: string }>
    ) {
      console.log('from login success');
      console.log('action  is ', action);

      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    logout(state) {
      ((state.accessToken = ''),
        (state.user = null),
        (state.isAuthenticated = false));
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    },
    setAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
      localStorage.setItem('accessToken', action.payload.accessToken);
      console.log('payload token ', action.payload.accessToken);

      state.accessToken = action.payload.accessToken;
      //console.log('new access tokes set',state.accessToken);
    },
  },
});
export default authSlice.reducer;
export const { loginSuccess, logout, setAccessToken } = authSlice.actions;

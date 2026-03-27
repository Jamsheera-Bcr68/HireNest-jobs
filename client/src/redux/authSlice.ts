import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../constants/types/user';
import { type userDto } from '../types/dtos/profileTypes/userTypes';

const savedUser = localStorage.getItem('user');
const token = localStorage.getItem('accessToken');
let parsedUser = null;
try {
  parsedUser = savedUser ? JSON.parse(savedUser) : null;
} catch {
  parsedUser = null;
}
const initialState: AuthState = {
  user: parsedUser,
  accessToken: token ? token : '',
  isAuthenticated: !!token,
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
      ((state.user = action.payload.user), (state.isAuthenticated = true));
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
    updateUser(state, action) {
      console.log('action update user', action);
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
      localStorage.setItem('user', JSON.stringify({ ...state.user }));
    },
  },
});
export default authSlice.reducer;
export const { loginSuccess, logout, setAccessToken, updateUser } =
  authSlice.actions;

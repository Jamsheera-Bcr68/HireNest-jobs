import axios from 'axios';
import { store } from '../redux/store';
import { logout, setAccessToken } from '../redux/slices/auth.slice';
import { parseApiError } from '../utils/error-parsor';

import { showGlobalToast } from '../utils/toast.service';
import { env } from '../config/env';



const axiosInstance = axios.create({
  baseURL: env.backendUrl,
  withCredentials: true,
  // headers: {
  //   'Content-Type': ' application/json',
  // },
});
const refreshAxios = axios.create({
  baseURL: env.backendUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
//if token is available attach
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error', error);

    const originalRequest = error.config;
    const url = originalRequest?.url;

    const isAuthRequest =
      url?.includes('/auth/login') ||
      url?.includes('/auth/admin/login') ||
      url?.includes('/auth/refresh-token');

    const isValidationError =
      error.response?.status === 400 && error.response?.data?.errors;

    if (isValidationError) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !isAuthRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // const res = await refreshAxios.post('/auth/refresh-token', {});
        console.log('this is the time to send refresh request');

        const newAccessToken = await handleRefreshTokenApi();

        if (!newAccessToken) {
          throw new Error('accessToken not in refresh response');
        }

        store.dispatch(
          setAccessToken({ accessToken: newAccessToken.toString() })
        );

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return axiosInstance(originalRequest);
      } catch (err) {
        await refreshAxios.post('/auth/logout', {});
        store.dispatch(logout());

        showGlobalToast({ msg: 'Something Went Wrong', type: 'error' });

        return Promise.reject(err);
      }
    }

    const message = parseApiError(error);

    showGlobalToast({
      msg: message,
      type: 'error',
    });

    return Promise.reject(error);
  }
);

export async function handleRefreshTokenApi() {
  const res = await refreshAxios.post('/auth/refresh-token', {});

  const newAccessToken = res.data?.accessToken;

  if (!newAccessToken) {
    throw new Error('accessToken not in refresh response');
  }

  store.dispatch(
    setAccessToken({
      accessToken: newAccessToken,
    })
  );

  return newAccessToken;
}

export default axiosInstance;

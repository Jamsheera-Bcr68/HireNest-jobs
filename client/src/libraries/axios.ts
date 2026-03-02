import axios from 'axios';
import { store } from '../redux/store';
import { logout, setAccessToken } from '../redux/authSlice';

console.log('VITE_BACKEND_URL', import.meta.env.VITE_BACKEND_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  // headers: {
  //   'Content-Type': ' application/json',
  // },
});
const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': ' application/json',
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
    console.log('error from inceptors', error);

    const originalRequest = error.config;
    console.log('originalRequest ', originalRequest);
    let url = originalRequest.url;
    const isAuthRequest =
      url?.includes('/auth/login') ||
      url?.includes('/auth/admin/login') ||
      url?.includes('/auth/refresh-token');

    if (
      error.response?.status === 401 &&
      !isAuthRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await refreshAxios.post(
          `/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        //console.log('refresh response', res.data);

        const newAccessToken = res.data?.accessToken;
        if (!newAccessToken) {
          console.error(
            'Token not found in response. Response data:',
            res.data
          );
          throw new Error('accessToken not in refresh response');
        }
        store.dispatch(setAccessToken({ accessToken: newAccessToken }));
        //  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log(err);
        await refreshAxios.post('/auth/logout', {}, { withCredentials: true });
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
// type BackendError={
//     statusCode:number,
//     message:string,
//     success:boolean
// }
// const normalizeError=(error:any)=>{
//     const response=error.response
//     return {
//         statusCode:response?.status??500,
//         message:response?.data?.message??'Some thing went wrong',
//         success:response?.data?.success??false
//     }
// }
// axiosInstance.interceptors.response.use((response)=>response,
// (error)=>Promise.reject(normalizeError(error))
// )

// export const backendErrorHandler=(err:BackendError)=>{
// if(err.statusCode===401){
//     alert("Session expired")
//     return
// }
// if(err.statusCode===403){
//     alert("Session expired")
//     return
// }
//  if (err.statusCode === 403) {
//     alert("Access denied");
//     return;
//   }
// }

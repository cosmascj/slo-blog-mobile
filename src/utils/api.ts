import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { showMessage } from 'react-native-flash-message';
import { BASE_API_URL } from '@env';
import EncryptedStorage from 'react-native-encrypted-storage';
import { ApiError } from '@/types/global';

const api = axios.create({
  baseURL: BASE_API_URL,
});

api.interceptors.request.use(
  //@ts-ignore
  async (config: AxiosRequestConfig) => {
    const token = await EncryptedStorage.getItem('appToken');
    if (token) {
      const userJSON: LoginResponse = JSON.parse(token);

      if (!userJSON) {
        EncryptedStorage.removeItem('user');
        EncryptedStorage.removeItem('appToken');
      } else {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${userJSON.data?.token}`;
        } else {
          console.log(config);
        }
      }
    } else {
    }

    return config;
  },
  error => Promise.reject(error),
);
export default api;
export const handleApiError = (
  err: AxiosError<ApiError>,
  tryAgain?: boolean,
  tryAgainFunc?: () => void,
  onDismiss?: () => void,
  tryAgainText = 'Try Again',
  title = '',
) => {
  const message = err.response?.data?.errors
    ? Object.values(err.response?.data?.errors)[0][0]
    : err.response?.data?.message ??
      err.response?.data?.detail ??
      err.response?.data?.error ??
      err?.message;

  console.log('api error', err?.config?.url, err.response?.data ?? err?.message);
  showMessage({
    message: message,
    type: 'danger',
    statusBarHeight: 40,
    icon: 'danger',
  });
};

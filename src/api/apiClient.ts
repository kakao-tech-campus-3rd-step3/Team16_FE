import axios from 'axios';
import useAuthStore from '@/stores/authStore';

const baseURL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL,
});

// 응답 인터셉터: 401 Unauthorized 응답을 받으면 인증 상태 초기화
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      const { clearTokens } = useAuthStore();
      clearTokens();
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

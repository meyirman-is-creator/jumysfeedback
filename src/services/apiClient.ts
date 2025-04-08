// src/services/apiClient.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'https://iwork-api.up.railway.app';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.request.use(
  async (config) => {
    // Если метод POST, PUT, DELETE, PATCH - добавляем CSRF-токен
    if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
      // Получаем CSRF-токен из cookie
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrfToken='))
        ?.split('=')[1];
      
      // Добавляем токен в заголовки запроса
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API
export const authAPI = {
  register: (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<AxiosResponse> => {
    return apiClient.post('/auth/register', userData);
  },
  
  login: (credentials: { username: string; password: string }): Promise<AxiosResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    return apiClient.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  
  verifyEmail: (token: string): Promise<AxiosResponse> => {
    return apiClient.post('/auth/verify-email', { token });
  },
  
  forgotPassword: (email: string): Promise<AxiosResponse> => {
    return apiClient.post('/auth/forgot-password', { email });
  },
  
  resetPassword: (token: string, newPassword: string): Promise<AxiosResponse> => {
    return apiClient.post('/auth/reset-password', {
      token,
      new_password: newPassword,
    });
  },
  
  logout: (refreshToken: string): Promise<AxiosResponse> => {
    return apiClient.post('/auth/logout', { refresh_token: refreshToken });
  },
  
  googleLogin: (): Promise<AxiosResponse> => {
    return apiClient.get('/oauth/google/login');
  },
  
  googleToken: (code: string): Promise<AxiosResponse> => {
    return apiClient.post('/oauth/google/token', { code });
  },
  
  getUserProfile: (): Promise<AxiosResponse> => {
    return apiClient.get('/users/me');
  },

  googleAuthRedirect: () => {
    window.location.href = `${BASE_URL}/oauth/google/login`;
  },
  
  // Обмен кода Google OAuth на токены IWork
  exchangeGoogleAuthCode: async (code: string): Promise<{ access_token: string; refresh_token: string }> => {
    const response = await apiClient.post('/oauth/google/token', { code });
    
    // Сохраняем полученные токены
    if (response.data.access_token && response.data.refresh_token) {
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
    }
    
    return response.data;
  },
};

export default apiClient;
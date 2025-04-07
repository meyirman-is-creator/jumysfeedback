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

// Response interceptor for refreshing token or handling errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // If error is 401 (unauthorized) and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token, user must login again
          return Promise.reject(error);
        }
        
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken
        });
        
        const { access_token, refresh_token } = response.data;
        
        // Update tokens in localStorage
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        
        // Update Authorization header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        
        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, user must login again
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
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
};

export default apiClient;
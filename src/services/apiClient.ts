// src/services/apiClient.ts - FULL FILE WITH CHANGES

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Установим baseURL в зависимости от окружения
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://iwork-api.up.railway.app';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // увеличим таймаут до 15 секунд
});

// Логируем запросы в режиме разработки
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Request: ${config.method?.toUpperCase()} ${config.url}`, config.params || config.data);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Логируем ответы в режиме разработки
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// CHANGE: Only apply interceptors on client-side
if (typeof window !== 'undefined') {
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

  // CSRF token interceptor
  apiClient.interceptors.request.use(
    async (config) => {
      // If method is POST, PUT, DELETE, PATCH - add CSRF token
      if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
        // Get CSRF token from cookie
        const csrfToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('csrfToken='))
          ?.split('=')[1];
        
        // Add token to request headers
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );
}

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

  // CHANGE: Only redirect if window exists
  googleAuthRedirect: () => {
    if (typeof window !== 'undefined') {
      window.location.href = `${BASE_URL}/oauth/google/login`;
    }
  },
  
  // Exchange Google OAuth code for IWork tokens
  exchangeGoogleAuthCode: async (code: string): Promise<{ access_token: string; refresh_token: string }> => {
    const response = await apiClient.post('/oauth/google/token', { code });
    
    // CHANGE: Only save tokens on client
    if (typeof window !== 'undefined' && response.data.access_token && response.data.refresh_token) {
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
    }
    
    return response.data;
  },
};

export default apiClient;
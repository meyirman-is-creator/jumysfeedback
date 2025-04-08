import { useMutation } from 'react-query';
import { authAPI } from '../services/apiClient';
import { useAppDispatch } from './reduxHooks';
import { useRouter } from 'next/navigation';
import { saveAuthTokens } from '../utils/helpers';
import { loginUser, registerUser, verifyEmail, forgotPassword, resetPassword } from '../features/auth/authSlice';

// Хук для регистрации
export const useRegister = () => {
  const dispatch = useAppDispatch();
  
  return useMutation(
    async (userData: { email: string; password: string; first_name: string; last_name: string }) => {
      const result = await dispatch(registerUser(userData)).unwrap();
      return result;
    },
    {
      onError: (error) => {
        console.error('Registration error:', error);
      }
    }
  );
};

// Хук для входа
export const useLogin = () => {
  const dispatch = useAppDispatch();
  
  return useMutation(
    async (credentials: { username: string; password: string }) => {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return result;
    },
    {
      onError: (error) => {
        console.error('Login error:', error);
      }
    }
  );
};

// Хук для подтверждения email
export const useVerifyEmail = () => {
  const dispatch = useAppDispatch();
  
  return useMutation(
    async (token: string) => {
      const result = await dispatch(verifyEmail(token)).unwrap();
      return result;
    },
    {
      onError: (error) => {
        console.error('Verification error:', error);
      }
    }
  );
};

// Хук для запроса сброса пароля
export const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  
  return useMutation(
    async (email: string) => {
      const result = await dispatch(forgotPassword(email)).unwrap();
      return result;
    },
    {
      onError: (error) => {
        console.error('Forgot password error:', error);
      }
    }
  );
};

// Хук для сброса пароля
export const useResetPassword = () => {
  const dispatch = useAppDispatch();
  
  return useMutation(
    async (credentials: { token: string; new_password: string }) => {
      const result = await dispatch(resetPassword(credentials)).unwrap();
      return result;
    },
    {
      onError: (error) => {
        console.error('Reset password error:', error);
      }
    }
  );
};

// Обновление существующих хуков React Query в useAuthQuery.ts

// Хук для обработки OAuth
export const useOAuthLogin = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    
    return useMutation(
      async (params: { code: string; provider: 'google' | 'linkedin' }) => {
        try {
          let response;
          if (params.provider === 'google') {
            response = await authAPI.exchangeGoogleAuthCode(params.code);
          } else {
            // Реализация для LinkedIn
            throw new Error('LinkedIn OAuth not implemented yet');
          }
          
          // Обновляем состояние Redux
          dispatch({ 
            type: 'auth/loginSuccess', 
            payload: {
              access_token: response.access_token,
              refresh_token: response.refresh_token 
            }
          });
          
          // Сохраняем токены
          saveAuthTokens(response.access_token, response.refresh_token, true);
          
          return response;
        } catch (error) {
          console.error('OAuth login error:', error);
          throw error;
        }
      },
      {
        onSuccess: () => {
          // Перенаправляем на главную страницу после успешной аутентификации
          router.push('/');
        },
        onError: (error) => {
          // Обрабатываем ошибку
          console.error('OAuth login error:', error);
          router.push('/auth/login');
        }
      }
    );
  };
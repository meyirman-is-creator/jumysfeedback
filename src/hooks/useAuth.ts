// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  verifyEmail, 
  getUserProfile,
  clearError,
  setVerificationEmail
} from '../features/auth/authSlice';
import { saveAuthTokens, removeAuthTokens, redirectAfterAuth } from '../utils/helpers';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    verificationRequired,
    verificationEmail
  } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (isClient && isAuthenticated && !user) {
      dispatch(getUserProfile());
    }
  }, [isAuthenticated, user, dispatch, isClient]);
  
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    if (!isClient) return false;
    
    try {
      await dispatch(loginUser({ username: email, password })).unwrap();
      
      // Сохраняем токены только на клиенте
      if (isClient) {
        // localStorage логика
      }
      
      router.push("/");
      return true;
    } catch (error) {
      return false;
    }
  };

  
  const register = async (userData: { 
    email: string; 
    password: string; 
    first_name: string; 
    last_name: string; 
  }) => {
    try {
      await dispatch(registerUser(userData)).unwrap();
      dispatch(setVerificationEmail(userData.email));
      router.push(`/auth/verify-email?email=${encodeURIComponent(userData.email)}`);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      
      // Удаляем токены из localStorage и cookie
      removeAuthTokens();
      
      router.push('/auth/login');
      return true;
    } catch (error) {
      // Даже в случае ошибки, удаляем токены
      removeAuthTokens();
      router.push('/auth/login');
      return false;
    }
  };
  
  const verify = async (token: string) => {
    try {
      await dispatch(verifyEmail(token)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const clearAuthError = () => {
    dispatch(clearError());
  };
  
  return {
    user,
    isAuthenticated: isClient && isAuthenticated, 
    isLoading,
    error,
    verificationRequired,
    verificationEmail,
    login,
    register,
    logout,
    verify,
    clearAuthError
  };
};
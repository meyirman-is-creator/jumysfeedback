// src/hooks/useAuth.ts
import { useEffect } from 'react';
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

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    verificationRequired,
    verificationEmail
  } = useAppSelector((state) => state.auth);
  
  // Check if user is authenticated when component mounts
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUserProfile());
    }
  }, [isAuthenticated, user, dispatch]);
  
  const login = async (email: string, password: string) => {
    try {
      await dispatch(loginUser({ username: email, password })).unwrap();
      router.push('/');
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
      router.push('/auth/verify');
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push('/auth/login');
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const verify = async (token: string) => {
    try {
      await dispatch(verifyEmail(token)).unwrap();
      router.push('/auth/login');
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
    isAuthenticated,
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
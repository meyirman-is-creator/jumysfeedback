// src/hooks/useAuth.ts - FULL FILE WITH CHANGES

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

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // CHANGE: Added state to track if we're on the client
  const [isClient, setIsClient] = useState(false);

  // CHANGE: Added useEffect to set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    verificationRequired,
    verificationEmail
  } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    // CHANGE: Only fetch user profile on client side
    if (isClient && isAuthenticated && !user) {
      dispatch(getUserProfile());
    }
  }, [isAuthenticated, user, dispatch, isClient]);
  
  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    // CHANGE: Check if we're on client before proceeding
    if (!isClient) return false;
    
    try {
      await dispatch(loginUser({ username: email, password })).unwrap();
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
      router.push('/auth/login');
      return true;
    } catch (error) {
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
    // CHANGE: Check isClient before returning isAuthenticated
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
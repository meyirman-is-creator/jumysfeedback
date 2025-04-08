// src/store/index.ts - FULL FILE WITH CHANGES

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// CHANGE HERE: Added proper SSR check for localStorage access
const getInitialAuthState = () => {
  const baseState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    verificationRequired: false,
    verificationEmail: null,
  };

  // CHANGE: Return baseState during SSR
  if (typeof window === 'undefined') {
    return baseState;
  }

  try {
    // CHANGE: Only try to access localStorage on client-side
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    return {
      ...baseState,
      accessToken,
      refreshToken,
      isAuthenticated: !!accessToken,
    };
  } catch (e) {
    // In case of localStorage access error, return base state
    console.warn('Could not access localStorage', e);
    return baseState;
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: getInitialAuthState(),
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
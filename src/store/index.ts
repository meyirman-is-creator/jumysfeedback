// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// Safely access localStorage
const getInitialAuthState = () => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      verificationRequired: false,
      verificationEmail: null,
    };
  }
  
  return {
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    isLoading: false,
    error: null,
    verificationRequired: false,
    verificationEmail: null,
  };
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers as needed
  },
  preloadedState: {
    auth: getInitialAuthState(),
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

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

  if (typeof window === 'undefined') {
    return baseState;
  }
  
 

  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    return {
      ...baseState,
      accessToken,
      refreshToken,
      isAuthenticated: !!accessToken,
    };
  } catch (e) {
    // В случае ошибки доступа к localStorage возвращаем базовое состояние
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
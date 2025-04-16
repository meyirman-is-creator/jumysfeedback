// src/app/providers.tsx
'use client';

import { useEffect } from 'react';
import { store } from "@/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch } from 'react-redux';
import { initializeAuth } from '@/features/auth/authSlice';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
        <Toaster />
      </AuthInitializer>
    </Provider>
  );
}
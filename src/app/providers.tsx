// src/app/providers.tsx
'use client';

import { store } from "@/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
}
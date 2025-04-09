"use client";

import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { TokenStorage } from "@/components/auth/TokenStorage";
import React from "react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider>
        <ReactQueryProvider>
          <TokenStorage />
          {children}
        </ReactQueryProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}

// src/components/auth/TokenStorage.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function TokenStorage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      localStorage.setItem('accessToken', session.accessToken as string);
      
      // Optionally, you might want to store refresh token too
      if (session.refreshToken) {
        localStorage.setItem('refreshToken', session.refreshToken as string);
      }
    }
  }, [session]);

  return null;
}
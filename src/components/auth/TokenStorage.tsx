"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { saveAuthTokens } from "@/utils/helpers";

export function TokenStorage() {
  const { data: session } = useSession();

  useEffect(() => {
    // Проверяем, что сессия существует и содержит токен
    if (session?.accessToken) {
      try {
        // Используем централизованный метод сохранения токенов
        saveAuthTokens(
          session.accessToken as string, 
          session.refreshToken as string || '', 
          true 
        );
      } catch (error) {
        console.error('Failed to save tokens:', error);
      }
    }
  }, [session]);

  return null;
}
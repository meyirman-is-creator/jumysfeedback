// src/app/csrf-middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Генерируем CSRF-токен, если его нет в cookies
  if (!request.cookies.has('csrfToken')) {
    const csrfToken = generateRandomToken();
    
    // Устанавливаем CSRF-токен в cookie
    response.cookies.set({
      name: 'csrfToken',
      value: csrfToken,
      httpOnly: false, // Должен быть доступен из JavaScript
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }
  
  return response;
}

// Генерация случайного токена
function generateRandomToken() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Применяем middleware только к API маршрутам, требующим CSRF-защиты
export const config = {
  matcher: ['/api/auth/:path*'],
};
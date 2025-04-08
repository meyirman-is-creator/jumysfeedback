import { NextRequest, NextResponse } from "next/server";

// Маршруты, которые не требуют аутентификации
const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/auth/verify',
  '/api/auth'
];

// Проверка, является ли маршрут публичным
const isPublicRoute = (pathname: string) => {
  return publicRoutes.some(route => pathname.startsWith(route)) || pathname === '/';
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Получаем токен из cookie или localStorage (в NextJS middleware доступны только cookies)
  const token = request.cookies.get('accessToken')?.value;
  
  // Если маршрут публичный, пропускаем
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  
  // Если нет токена, но маршрут требует аутентификации
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Пропускаем запрос, если есть токен
  return NextResponse.next();
}

// Применяем middleware только к определенным маршрутам
export const config = {
  matcher: [
    // Защищаем все маршруты пользовательского профиля
    '/profile/:path*',
    '/reviews/:path*',
    '/salaries/:path*',
    '/add/:path*',
  ],
};
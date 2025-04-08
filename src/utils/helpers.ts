// Сохранение токенов аутентификации
export const saveAuthTokens = (accessToken: string, refreshToken: string, rememberMe: boolean = false) => {
    // Сохраняем в localStorage для простого доступа через JavaScript
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    // Если нужно запомнить пользователя, устанавливаем cookie с более длительным сроком
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 дней : 1 день
    
    // Сохраняем refresh_token в HttpOnly cookie для безопасности
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
  };
  
  // Удаление токенов при выходе
  export const removeAuthTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Удаляем cookie, устанавливая отрицательное время жизни
    document.cookie = 'refreshToken=; path=/; max-age=-1; HttpOnly; Secure; SameSite=Lax';
  };
  
  // Функция для редиректа после аутентификации
  export const redirectAfterAuth = (router: any, defaultPath: string = '/') => {
    // Проверяем, был ли сохранен предыдущий маршрут (например, перед перенаправлением на логин)
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    
    if (redirectPath) {
      localStorage.removeItem('redirectAfterLogin');
      router.push(redirectPath);
    } else {
      router.push(defaultPath);
    }
  };
// src/utils/helpers.ts - FULL FILE WITH CHANGES

// CHANGE: Add check for window/document existence

// Save auth tokens
export const saveAuthTokens = (accessToken: string, refreshToken: string, rememberMe: boolean = false) => {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  // Save to localStorage for easy JavaScript access
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  
  // If we need to remember user, set cookie with longer duration
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days : 1 day
  
  // Save refresh_token in HttpOnly cookie for security
  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
};

// Remove tokens on logout
export const removeAuthTokens = () => {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  
  // Remove cookie by setting negative max-age
  document.cookie = 'refreshToken=; path=/; max-age=-1; HttpOnly; Secure; SameSite=Lax';
};

// Function for redirect after authentication
export const redirectAfterAuth = (router: any, defaultPath: string = '/') => {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  // Check if previous route was saved (e.g., before redirect to login)
  const redirectPath = localStorage.getItem('redirectAfterLogin');
  
  if (redirectPath) {
    localStorage.removeItem('redirectAfterLogin');
    router.push(redirectPath);
  } else {
    router.push(defaultPath);
  }
};
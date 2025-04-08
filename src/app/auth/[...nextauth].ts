import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import { authAPI } from '@/services/apiClient';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Сохраняем сode в токене для дальнейшего обмена на IWork токен
      if (account?.provider === 'google' && account.code) {
        token.code = account.code;
        token.provider = 'google';
      }
      
      if (account?.provider === 'linkedin' && account.code) {
        token.code = account.code;
        token.provider = 'linkedin';
      }
      
      return token;
    },
    async session({ session, token }) {
      // При создании сессии, если есть код и он еще не был использован
      if (token.code && !token.iworkToken) {
        try {
          // Обмениваем код OAuth на токен IWork
          const response = await authAPI.googleToken(token.code as string);
          
          // Сохраняем токены IWork в token
          token.iworkToken = response.data.access_token;
          token.iworkRefreshToken = response.data.refresh_token;
          
          // Сохраняем токены в localStorage для использования apiClient
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
          }
          
          // Удаляем код, чтобы больше не использовать его
          delete token.code;
        } catch (error) {
          console.error('Error exchanging OAuth code for IWork token:', error);
        }
      }
      
      // Добавляем информацию о токенах в сессию
      session.accessToken = token.iworkToken as string;
      
      return session;
    },
    async redirect({ url, baseUrl }) {
      // После аутентификации редиректим на главную
      return baseUrl;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  debug: process.env.NODE_ENV === 'development',
});
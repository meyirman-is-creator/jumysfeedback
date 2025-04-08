
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import { authAPI } from '@/services/apiClient';

export const authOptions: NextAuthOptions = {
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
        async session({ session, token }: { session: any, token: any }) {
            if (token.iworkToken) {
                session.accessToken = token.iworkToken as string;
            }
            
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
    },
    debug: process.env.NODE_ENV === 'development',
};
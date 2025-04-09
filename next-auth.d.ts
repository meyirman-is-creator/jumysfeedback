
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id?: string | number;
    } & DefaultSession['user']
  }

  interface Token {
    accessToken?: string;
    refreshToken?: string;
    id?: string | number;
  }
}

// Если используете JWT
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    id?: string | number;
  }
}
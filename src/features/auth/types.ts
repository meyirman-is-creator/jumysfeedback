// src/features/auth/types.ts
export interface User {
  username: string;
  jobTitle: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  withUsSince: string;
  role: string;
  reviewsCount?: number;
  salaryCount?: number;
}
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  data: {
    fullName: string;
    jobTitle: string;
    company: string;
    location: string;
    email: string;
    phone: string;
    withUsSince: string;
    role: string;
    reviewsCount: number;
    salaryCount: number;
  };
}

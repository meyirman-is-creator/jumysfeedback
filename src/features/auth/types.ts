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
  errorCode: number | null;
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
  data: {
    username: string;
    jobTitle: string;
    company: string;
    location: string;
    email: string;
    phone: string;
    withUsSince: string;
    role: string;
    reviewsCount: number;
    salaryCount: number;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ProfileData {
  username?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  email?: string;
  phone?: string;
  jobId: number;
  locationId?: number;
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  oldPassword: string; 
}

export interface ErrorResponse {
  message: string;
  code: number | null;
}
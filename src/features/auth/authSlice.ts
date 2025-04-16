// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authAPI from "./authAPI";
import {
  AuthState,
  SignupRequest,
  VerifyEmailRequest,
  LoginRequest,
  User,
} from "./types";

const initialState: AuthState = {
  user: null,
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  isAuthenticated: !!Cookies.get("accessToken"),
  isLoading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: SignupRequest, { rejectWithValue }) => {
    try {
      await authAPI.signup(data);
      // Store email for verification page
      sessionStorage.setItem("emailForVerification", data.email);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to signup"
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data: VerifyEmailRequest, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyEmail(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify email"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(data);

      // Store tokens in cookies
      Cookies.set("accessToken", response.accessToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", response.refreshToken, {
        secure: true,
        sameSite: "strict",
      });

      const user: User = {
        fullName: response.data.fullName, // Fixed property name
        jobTitle: response.data.jobTitle,
        company: response.data.company,
        location: response.data.location,
        email: response.data.email,
        phone: response.data.phone,
        withUsSince: response.data.withUsSince,
        role: response.data.role,
        reviewsCount: response.data.reviewsCount || 0,
        salaryCount: response.data.salaryCount || 0,
      };

      return {
        user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Remove cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      // Clear any localStorage/sessionStorage items
      sessionStorage.removeItem("emailForVerification");

      try {
        // Try to call logout API but don't let it block the logout process
        await authAPI.logout();
      } catch (apiError) {
        console.warn(
          "Logout API error, but continuing with local logout:",
          apiError
        );
      }

      return true;
    } catch (error: any) {
      // Still perform local logout even if there's an error
      return rejectWithValue(
        error.response?.data?.message || "Failed to logout"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    // Add this action to manually reset state when needed
    clearAuth: () => initialState,
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Verify Email
    builder.addCase(verifyEmail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyEmail.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Logout - completely reset state to initial values
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, () => {
      // Return initial state to completely reset everything
      return initialState;
    });
    builder.addCase(logout.rejected, (state, action) => {
      // Even on API error, we still reset the auth state
      return {
        ...initialState,
        error: action.payload as string,
      };
    });
  },
});

export const { resetAuthState, clearAuth } = authSlice.actions;

export default authSlice.reducer;

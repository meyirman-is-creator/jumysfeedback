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
import apiClient from "@/services/apiClient";

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

      Cookies.set("accessToken", response.accessToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", response.refreshToken, {
        secure: true,
        sameSite: "strict",
      });

      const user: User = {
        username: response.data.username,
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

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.put("/profile/edit", data);
      return {
        username: data.fullName,
        jobTitle: data.jobTitle,
        company: data.company,
        location: data.location,
        email: data.email,
        phone: data.phone,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      sessionStorage.removeItem("emailForVerification");

      try {
        await authAPI.logout();
      } catch (apiError) {
        console.warn(
          "Logout API error, but continuing with local logout:",
          apiError
        );
      }

      return true;
    } catch (error: any) {
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
    clearAuth: () => initialState,
  },
  extraReducers: (builder) => {
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

    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });
    builder.addCase(logout.rejected, (state, action) => {
      return {
        ...initialState,
        error: action.payload as string,
      };
    });
  },
});

export const { resetAuthState, clearAuth } = authSlice.actions;

export default authSlice.reducer;

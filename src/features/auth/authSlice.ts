import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authAPI from "./authAPI";
import profileAPI from "../profile/profileAPI";
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
  errorCode: null,
};

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        return null;
      }

      const response = await profileAPI.getProfile();
      return response.data || null;
    } catch (error: any) {
      return rejectWithValue({
        message: "Не удалось загрузить профиль",
        code: error.response?.status || null,
      });
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: SignupRequest, { rejectWithValue }) => {
    try {
      await authAPI.signup(data);
      sessionStorage.setItem("emailForVerification", data.email);
      return true;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.error ||
          error.response?.data?.message ||
          "Не удалось зарегистрироваться",
        code: error.response?.status || null,
      });
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
      return rejectWithValue({
        message: error.response?.data?.error ||
          error.response?.data?.message ||
          "Не удалось подтвердить email",
        code: error.response?.status || null,
      });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(data);

      Cookies.set("accessToken", response.data.accessToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", response.data.refreshToken, {
        secure: true,
        sameSite: "strict",
      });

      const profileResponse = await profileAPI.getProfile();

      const user: User = profileResponse.data || {
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
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.error ||
          error.response?.data?.message ||
          "Не удалось войти",
        code: error.response?.status || null,
      });
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiClient.put("/profile/edit", data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.error ||
          error.response?.data?.message ||
          "Не удалось обновить профиль",
        code: error.response?.status || null,
      });
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
      return rejectWithValue({
        message: error.response?.data?.error ||
          error.response?.data?.message ||
          "Не удалось выйти",
        code: error.response?.status || null,
      });
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
      state.errorCode = null;
    },
    clearAuth: () => initialState,
    syncWithProfile: (state, action) => {
      if (state.user && action.payload) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(initializeAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      if (action.payload && typeof action.payload === 'object') {
        const payload = action.payload as { message: string; code: number | null };
        state.error = payload.message;
        state.errorCode = payload.code;
      }
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    });

    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.errorCode = null;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload && typeof action.payload === 'object') {
        const payload = action.payload as { message: string; code: number | null };
        state.error = payload.message;
        state.errorCode = payload.code;
      } else {
        state.error = 'Произошла неизвестная ошибка';
        state.errorCode = null;
      }
    });

    builder.addCase(verifyEmail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.errorCode = null;
    });
    builder.addCase(verifyEmail.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload && typeof action.payload === 'object') {
        const payload = action.payload as { message: string; code: number | null };
        state.error = payload.message;
        state.errorCode = payload.code;
      } else {
        state.error = 'Произошла неизвестная ошибка';
        state.errorCode = null;
      }
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.errorCode = null;
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
      if (action.payload && typeof action.payload === 'object') {
        const payload = action.payload as { message: string; code: number | null };
        state.error = payload.message;
        state.errorCode = payload.code;
      } else {
        state.error = 'Произошла неизвестная ошибка';
        state.errorCode = null;
      }
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.errorCode = null;
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
      if (action.payload && typeof action.payload === 'object') {
        const payload = action.payload as { message: string; code: number | null };
        state.error = payload.message;
        state.errorCode = payload.code;
      } else {
        state.error = 'Произошла неизвестная ошибка';
        state.errorCode = null;
      }
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.errorCode = null;
    });
    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });
    builder.addCase(logout.rejected, (state, action) => {
      return {
        ...initialState,
        error: action.payload && typeof action.payload === 'object'
          ? (action.payload as { message: string }).message
          : 'Произошла неизвестная ошибка',
        errorCode: action.payload && typeof action.payload === 'object'
          ? (action.payload as { code: number | null }).code
          : null
      };
    });
  },
});

export const { resetAuthState, clearAuth, syncWithProfile } = authSlice.actions;

export default authSlice.reducer;
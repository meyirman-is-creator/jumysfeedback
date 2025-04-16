import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileAPI from "./profileAPI";

interface ProfileState {
  data: any;
  isLoading: boolean;
  error: string | null;
  fetchedOnce: boolean; // Add flag to track if data has been fetched at least once
}

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  error: null,
  fetchedOnce: false, // Initialize to false
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile();
      // Return only the data field from the response
      return response.data; // Correctly extract just the data field
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get profile"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateProfile(data);
      return response.data; // Extract data from the response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async (
    data: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await profileAPI.updatePassword(data);
      return response.data; // Extract data from the response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update password"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    clearProfileData: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.fetchedOnce = true; // Mark that data has been fetched
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = { ...state.data, ...action.payload };
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetProfileState, clearProfileData } = profileSlice.actions;

export default profileSlice.reducer;

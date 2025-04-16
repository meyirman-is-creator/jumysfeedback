import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileAPI from "./profileAPI";

interface ProfileState {
  data: any;
  isLoading: boolean;
  error: string | null;
  fetchedOnce: boolean;
}

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  error: null,
  fetchedOnce: false,
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile();
      // Make sure we're returning the data in the expected format
      return response.data || null;
    } catch (error: any) {
      console.error("Error fetching profile:", error);
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
      return response.data || data; // Fallback to the input data if no response
    } catch (error: any) {
      console.error("Error updating profile:", error);
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
      return response.data;
    } catch (error: any) {
      console.error("Error updating password:", error);
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
      state.fetchedOnce = true;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      // Even if it fails, we've attempted a fetch
      state.fetchedOnce = true;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      // Create a merged state of existing data and new data
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

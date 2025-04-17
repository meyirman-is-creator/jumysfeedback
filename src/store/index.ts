// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";
import reviewReducer from "@/features/review/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    review: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// src/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  login,
  logout,
  signup,
  verifyEmail,
  resetAuthState,
  updateUserProfile,
  initializeAuth,
} from "@/features/auth/authSlice";
import {
  LoginRequest,
  SignupRequest,
  VerifyEmailRequest,
} from "@/features/auth/types";
import apiClient from "@/services/apiClient";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const initAuth = () => dispatch(initializeAuth());

  const signupUser = (data: SignupRequest) => dispatch(signup(data));

  const verifyUserEmail = (data: VerifyEmailRequest) =>
    dispatch(verifyEmail(data));

  const loginUser = (data: LoginRequest) => dispatch(login(data));

  const logoutUser = () => dispatch(logout());

  const resetAuth = () => dispatch(resetAuthState());

  const updateProfile = (profileData) => {
    if (auth.isAuthenticated) {
      return dispatch(updateUserProfile(profileData));
    }
    return Promise.resolve();
  };

  const updatePassword = async (passwordData) => {
    if (auth.isAuthenticated) {
      try {
        const response = await apiClient.post(
          "/profile/update-password",
          passwordData
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }
    return Promise.resolve();
  };

  return {
    ...auth,
    initAuth,
    signupUser,
    verifyUserEmail,
    loginUser,
    logoutUser,
    resetAuth,
    updateProfile,
    updatePassword,
  };
};

export default useAuth;

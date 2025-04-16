// src/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  login,
  logout,
  signup,
  verifyEmail,
  resetAuthState,
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

  const signupUser = (data: SignupRequest) => dispatch(signup(data));
  const verifyUserEmail = (data: VerifyEmailRequest) =>
    dispatch(verifyEmail(data));
  const loginUser = (data: LoginRequest) => dispatch(login(data));
  const logoutUser = () => dispatch(logout());
  const resetAuth = () => dispatch(resetAuthState());

  const updateProfile = async (profileData) => {
    try {
      const response = await apiClient.put("/profile/edit", profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      const response = await apiClient.post(
        "/profile/update-password",
        passwordData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    ...auth,
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

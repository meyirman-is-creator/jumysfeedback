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
  clearAuth,
} from "@/features/auth/authSlice";
import {
  LoginRequest,
  SignupRequest,
  VerifyEmailRequest,
  ProfileData,
  PasswordUpdateData,
} from "@/features/auth/types";
import apiClient from "@/services/apiClient";
import Cookies from "js-cookie";

let authInitialized = false;

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const initAuth = () => {
    if (!authInitialized) {
      authInitialized = true;
      return dispatch(initializeAuth());
    }
    return Promise.resolve();
  };

  const signupUser = async (data: SignupRequest) => {
    try {
      const result = await dispatch(signup(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const verifyUserEmail = async (data: VerifyEmailRequest) => {
    try {
      const result = await dispatch(verifyEmail(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (data: LoginRequest) => {
    try {
      const result = await dispatch(login(data)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    await dispatch(logout());
    dispatch(clearAuth());

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    return Promise.resolve();
  };

  const resetAuth = () => dispatch(resetAuthState());

  const updateProfile = (profileData: ProfileData) => {
    if (auth.isAuthenticated) {
      return dispatch(updateUserProfile(profileData));
    }
    return Promise.resolve();
  };

  const updatePassword = async (passwordData: PasswordUpdateData) => {
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
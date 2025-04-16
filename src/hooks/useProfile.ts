// src/hooks/useProfile.ts
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "./useAuth";

export const useProfile = () => {
  const { user, isAuthenticated, isLoading, initAuth } = useAuth();

  const fetchProfile = () => {
    if (isAuthenticated && !user) {
      return initAuth();
    }
    return Promise.resolve(user);
  };

  const updateUserProfile = (data) => {
    const { updateProfile } = useAuth();
    return updateProfile(data);
  };

  const changePassword = (data) => {
    const { updatePassword } = useAuth();
    return updatePassword(data);
  };

  return {
    data: user,
    isLoading,
    isAuthenticated,
    fetchProfile,
    updateUserProfile,
    changePassword,
  };
};

export default useProfile;

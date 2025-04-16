import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  getProfile,
  updateProfile,
  updatePassword,
  resetProfileState,
  clearProfileData,
} from "@/features/profile/profileSlice";
import {
  UpdateProfileRequest,
  UpdatePasswordRequest,
} from "@/features/profile/types";

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Modified to implement caching logic
  const fetchProfile = () => {
    if (isAuthenticated) {
      // Only fetch if we're authenticated and haven't fetched before or if we force refresh
      if (!profile.fetchedOnce || profile.data === null) {
        return dispatch(getProfile());
      }
      // Return a resolved promise with existing data if already fetched
      return Promise.resolve(profile.data);
    }
    return Promise.resolve();
  };

  const updateUserProfile = (data: UpdateProfileRequest) =>
    isAuthenticated ? dispatch(updateProfile(data)) : Promise.resolve();

  const changePassword = (data: UpdatePasswordRequest) =>
    isAuthenticated ? dispatch(updatePassword(data)) : Promise.resolve();

  const resetProfile = () => dispatch(resetProfileState());

  // Add method to clear profile data (useful for logout)
  const clearProfile = () => dispatch(clearProfileData());

  return {
    ...profile,
    fetchProfile,
    updateUserProfile,
    changePassword,
    resetProfile,
    clearProfile,
  };
};

export default useProfile;

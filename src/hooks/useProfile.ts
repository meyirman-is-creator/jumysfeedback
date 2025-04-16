import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  getProfile,
  updateProfile,
  updatePassword,
  resetProfileState,
} from "@/features/profile/profileSlice";
import {
  UpdateProfileRequest,
  UpdatePasswordRequest,
} from "@/features/profile/types";

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const fetchProfile = () => {
    if (isAuthenticated) {
      return dispatch(getProfile());
    }
    return Promise.resolve();
  };

  const updateUserProfile = (data: UpdateProfileRequest) =>
    isAuthenticated ? dispatch(updateProfile(data)) : Promise.resolve();

  const changePassword = (data: UpdatePasswordRequest) =>
    isAuthenticated ? dispatch(updatePassword(data)) : Promise.resolve();

  const resetProfile = () => dispatch(resetProfileState());

  return {
    ...profile,
    fetchProfile,
    updateUserProfile,
    changePassword,
    resetProfile,
  };
};

export default useProfile;
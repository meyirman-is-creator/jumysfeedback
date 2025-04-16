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

  const fetchProfile = () => dispatch(getProfile());
  const updateUserProfile = (data: UpdateProfileRequest) =>
    dispatch(updateProfile(data));
  const changePassword = (data: UpdatePasswordRequest) =>
    dispatch(updatePassword(data));
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

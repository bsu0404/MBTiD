import { UserMbtiProfile } from "../types/profile";
import { api } from "./https";
// 유저 프로필 조회
export const fetchUserProfile = async (userId: string) => {
  const response = await api.get<UserMbtiProfile>("/home/profile", {
    params: { user_id: userId },
  });

  return response.data;
};
// 내 프로필 조회
export const fetchMyProfile = async () => {
  const res = await api.get<UserMbtiProfile>("/home/profile/my");
  return res.data;
};

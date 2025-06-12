import { MbtiUpdateReq, UserMbtiProfile } from "../types/profile";
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
  const res = await api.get<UserMbtiProfile>("my/home/profile");
  return res.data;
};

// 닉네임 수정
export const updateNickname = async (nickname: string) => {
  const res = await api.patch("/user/update_nickname", { nickname });
  return res.data;
};

// mbti 수정
export const updateMbti = async (data: MbtiUpdateReq) => {
  const res = await api.patch("/user/update_mbti", data);
  return res.data;
};

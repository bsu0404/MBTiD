import { CheckFriendRes, MyFriendRes } from "@/types/friend";
import { api } from "./https";
// 친구(보관함) 조회
export const fetchMyFriend = async () => {
  const response = await api.get<MyFriendRes>("/cardcase");
  return response.data;
};
// 친구(보관함) 추가
export const createFriend = async (userId: string) => {
  const response = await api.post(`/cardcase?target_user_id=${userId}`);
  return response.data;
};
// 친구(보관함) 삭제
export const deleteFriend = async (userId: string) => {
  const response = await api.delete(`/cardcase/${userId}`);
  return response.data;
};
// 친구 여부 조회
export const checkFriend = async (userId: string) => {
  const response = await api.get<CheckFriendRes>(
    `my/home/profile/friends?user_id=${userId}`
  );
  return response.data.isFriend;
};
